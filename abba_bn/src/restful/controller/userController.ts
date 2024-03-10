import express from "express";
import { errorHandler } from '../../error';
import * as yup from "yup";
import { IUserController } from "../routes/routes";
import { JWT,createJwt } from "../../jwt";
import { v4 as uuid } from 'uuid';
import { hashPassword } from "../../bcrypt";
import { userService } from "../service/userService";

// import { encryptionData } from "../../language/crypt";
type LoginUser = {
    mobile_or_email:string
    password:string
}
type RegUser = {
    id:string
    display_name:string,
    mobile:string,
    email: string,
    password: string,
    confirm_password?:string,
    area:string,
    area_value:string
    district:string,
    district_value:string,
    station:string,
    station_value:string,
    address:string,

}

export let registerUserSchema = yup.object().shape({
    id:yup.string().required(),
    display_name:yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6, 'must be at least 6 characters long').required(),
    confirm_password: yup.string().min(6, 'must be at least 6 characters long').required(),
    area:yup.string().required(),
    district:yup.string().required(),
    station:yup.string().required(),
    address:yup.string().required(),
});
export let loginUserSchema = yup.object().shape({
    mobile_or_email: yup.string().required(),
    password: yup.string().min(6, 'must be at least 6 characters long').required(),
});

export class UserController implements IUserController{
    constructor(){}
    async login(req:express.Request,res:express.Response){
        try {
    
            let userData = req.body as LoginUser
            let {id,role} = await userService.login(userData)
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
            
            if(userData.password !== userData.confirm_password){
                throw new Error('password not match!')
            }
            userData.id = uuid() as string
            await registerUserSchema.validate(userData);
            delete userData.confirm_password
            userData.password = await hashPassword(userData.password)
            console.log(userData)
            userData.area_value = userData.area.split("@")[0]
            userData.area = userData.area.split("@")[1]
            userData.district_value = userData.district.split("@")[0]
            userData.district = userData.district.split("@")[1]
            userData.station_value = userData.station.split("@")[0]
            userData.station = userData.station.split("@")[1]
            let {id,role} = await userService.register(userData)

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
    
    async getPickUpAddress(req:express.Request,res:express.Response){
      try {
          let jwt = res.locals.jwt as JWT
          
          let {area,district,station,address} = await userService.getPickUpAddress(jwt.usersId)
          res.json({
              data:{
                area:area,
                district:district,
                station:station,
                address:address
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