import express from "express";
import { errorHandler } from '../../error';
import * as yup from "yup";
import { IUserController } from "../routes/routes";
import { JWT,Role,createJwt } from "../../jwt";
import { v4 as uuid } from 'uuid';
import { hashPassword } from "../../bcrypt";
import { userService } from "../service/userService";

// import { encryptionData } from "../../language/crypt";
type LoginUser = {
    mobileOrEmail:string
    password:string
}
type RegUser = {
    id?:string
    displayName:string,
    mobile:string,
    email: string,
    password: string,
    confirmPassword?:string,
    role?:Role,
    fullAddress:string
}

export let registerUserSchema = yup.object().shape({
    id:yup.string().required(),
    displayName:yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6, 'must be at least 6 characters long').required(),
    confirmPassword: yup.string().min(6, 'must be at least 6 characters long').required(),
    fullAddress:yup.string().required(),
    
});
export let loginUserSchema = yup.object().shape({
    mobileOrEmail: yup.string().required(),
    password: yup.string().min(6, 'must be at least 6 characters long').required(),
});

export class UserController implements IUserController{
    constructor(){}
    async login(req:express.Request,res:express.Response){
        try {
    
            let userData = req.body as LoginUser
            let {id,role} = await userService.login({
              mobile_or_email:userData.mobileOrEmail,
              password:userData.password
            })
            console.log(id,role)
            let jwt = await createJwt(id,role)
            res.json({
                data:{
                  role:role,
                  token:jwt,
                },
                isErr:false,
                errMess:null
            })
            
        
          } catch (err) {
            
            errorHandler(err,req,res)
          }
    }
    async register(req:express.Request,res:express.Response){
       
      try {
              
            let userData = req.body as RegUser
            
            if(userData.password !== userData.confirmPassword){
                throw new Error('password not match!')
            }
            userData.id = uuid() as string
            await registerUserSchema.validate(userData);
            delete userData.confirmPassword
            userData.password = await hashPassword(userData.password)
            console.log(userData)
            
            userData.role = "customer"
            let {id,role} = await userService.register({
              id:userData.id,
              display_name:userData.displayName,
              mobile:userData.mobile,
              email:userData.email,
              password:userData.password,
              role:userData.role,
              full_address:userData.fullAddress,
           
            })

            let jwt = await createJwt(id,role)
            
            res.json({
                data:{
                  role:role,
                  token:jwt,
                },
                isErr:false,
                errMess:null
            })
            
          } catch (err) {
            errorHandler(err,req,res)
          }
    }
    async getCurrentUser(req:express.Request,res:express.Response){
        try {
            let jwt = res.locals.jwt as JWT
            
            let {role} = await userService.getCurrentUser(jwt.usersId)
            res.json({
                data:{
                  role:role,
                  token:jwt,
                },
                isErr:false,
                errMess:null
            })
          } catch (err) {
            errorHandler(err,req,res)
          }
    }
    
    async getPickUpAddressAndMobile(req:express.Request,res:express.Response){
      try {
          let jwt = res.locals.jwt as JWT
          
          let {fullAddress} = await userService.getPickUpAddress(jwt.usersId)
          
          let {tel} = await userService.getMobile(jwt.usersId)
          
          res.json({
              data:{
                fullAddress:fullAddress,
                tel:tel,
              },
              isErr:false,
              errMess:null
          })
        } catch (err) {
          
          errorHandler(err,req,res)
        }
    }
    // async getLanguageDataAuth(req:express.Request,res:express.Response){
      // try {
      // let jwt = res.locals.jwt as JWT
      // let require = req.params.require as "cn" | "eng"
      // console.log(jwt)
      // if(jwt.role === "customer"){
      //   let languageData = await userService.getLan(require)
      //   console.log(languageData)
      //   res.json({
      //     data:languageData,
      //     isErr:false,
      //     errMess:null
      //   })
      // }else{
        // let languageData = await userService.getLan(require)
        
    //     res.json({
    //       data:languageData,
    //       isErr:false,
    //       errMess:null
    //     })
    //   }
    //   }catch(err){
    //     errorHandler(err,req,res)
    //   }
    // }

    async getLanguageDataGuest(req:express.Request,res:express.Response){
      try {
      
      let require = req.params.require as "cn" | "eng"
      
      
        let languageData = await userService.getLan(require)
        
        res.json({
          data:languageData,
          isErr:false,
          errMess:null
        })
         
      }catch(err){
        errorHandler(err,req,res)
      }
    }
}