import express from "express";
import { errorHandler } from '../../error';
import * as yup from "yup";
import { IUserController } from "../routes/routes";
import { JWT,Role,createJwt } from "../../jwt";
import { v4 as uuid } from 'uuid';
import { hashPassword } from "../../bcrypt";
import { userService } from "../service/userService";
import nodemailer, { Transporter } from 'nodemailer';

import { env_config } from "../../env";
import {google} from 'googleapis'

type LoginUser = {
    mobileOrEmail:string
    password:string
}
type RegUser = {
    displayName:string,
    mobile:string,
    email: string,
    password: string,
    confirmPassword?:string,
    district:string
    street:string
    building:string
}

export let registerUserSchema = yup.object().shape({
    
    displayName:yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6, 'must be at least 6 characters long').required(),
    confirmPassword: yup.string().min(6, 'must be at least 6 characters long').required(),
    district:yup.string().required(),
    street:yup.string().required(),
    building:yup.string().required(),
    
});
export let loginUserSchema = yup.object().shape({
    mobileOrEmail: yup.string().required(),
    password: yup.string().min(6, 'must be at least 6 characters long').required(),
});
export let editPasswordSchema = yup.string().min(6, 'must be at least 6 characters long').required();

export class UserController implements IUserController{
    constructor(){}
    async forgetPassword(req:express.Request,res:express.Response){
      try {
      const CLIENT_ID = '116868407254-0dju0qqkm92mdaoltcplkc25l55n6vtq.apps.googleusercontent.com';
      const CLIENT_SECRET = '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';
      const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
      const REFRESH_TOKEN = "1//04KRnqPrv7xJoCgYIARAAGAQSNwF-L9Ir3RM7hpIttG_rNA0zftsDOUk0-TwygGUy2bUMSlVmHAlPT-spDHpOdVnF2Dx5j2mE48U"

      const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
      const accessToken:any = await oAuth2Client.getAccessToken();
      // console.log(oAuth2Client)
        let jwt = res.locals.jwt as JWT
        let {email} = await userService.forgetPass(jwt.usersId)
        let token = await createJwt(jwt.usersId,jwt.role,300)
        const transporter: Transporter<any> = nodemailer.createTransport({
          service: 'gmail', // 或者其他支持的郵件服務名稱
          auth: {
            type: 'OAuth2',
            user: 'logbechan@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken            
          },
        });
        const mailOptions = {
          from: "codemasterpro1314@gmail.com",
          to: email,
          subject: 'Password Reset',
          text: `Click the following link to reset your password: ${env_config.PORTAL_HOST}/reset-password/${token}`,
        };
        await transporter.sendMail(mailOptions)
        
        res.json({
          data:null,
          isErr:false,
          errMess:null
        })

      } catch (err) {
        console.log(err.message)  
        // errorHandler(err,req,res)
      }
    }
    async checkResetPasswordToken(req:express.Request,res:express.Response){
      try {
        let jwt = res.locals.jwt as JWT
        console.log(jwt)
        
        res.json({
            data:null,
            isErr:false,
            errMess:null
        })
        
    
      } catch (err) {
        
        errorHandler(err,req,res)
      }
    }
    async resetPassword(req:express.Request,res:express.Response){
      try {
        let jwt = res.locals.jwt as JWT
        
        let userData = req.body as {password:string}
        
        userData.password = await hashPassword(userData.password)
        await userService.resetPass(jwt.usersId,userData.password)
        
        res.json({
            data:null,
            isErr:false,
            errMess:null
        })
        
    
      } catch (err) {
        
        errorHandler(err,req,res)
      }
    }
    // async editUserPassword(req:express.Request,res:express.Response){
    //   try {
    //     let jwt = res.locals.jwt as JWT
    //     let userData = req.body as {currentPassword:string,newPassword:string}
    //     if (userData.currentPassword === userData.newPassword){
    //       throw new Error('Repeated passwords')
    //     } else {
    //       await editPasswordSchema.validate(userData.newPassword);
    //       await userService.editUserPassword(jwt.usersId, userData);

    //       res.json({
    //         data:null,
    //         isErr:false,
    //         errMess:null
    //       });
    //     }

    //   } catch (err) {
    //     errorHandler(err,req,res);
    //   }
    // };
    async editUserMobile(req:express.Request,res:express.Response){
      try {
          let jwt = res.locals.jwt as JWT
          let userData = req.body as {newMobile:string}
          await userService.editUserMobile(jwt.usersId,{mobile:userData.newMobile});

          res.json({
              data:null,
              isErr:false,
              errMess:null
          })
        
        } catch (err) {
          
          errorHandler(err,req,res)
        }
    }
    async editUserAddress(req:express.Request,res:express.Response){
      try {
          let jwt = res.locals.jwt as JWT
          let userData = req.body as {district:string,street:string,building:string}
          await userService.editUserAddress(jwt.usersId,{full_address:userData.district + '|_|' + userData.street + '|_|' + userData.building})
          
          res.json({
              data:null,
              isErr:false,
              errMess:null
          })
      
        } catch (err) {
          
          errorHandler(err,req,res)
        }
    }
    async deleteUser(req:express.Request,res:express.Response){
      try {
          let jwt = res.locals.jwt as JWT;
          await userService.delUser(jwt.usersId)

          res.json({
              data:null,
              isErr:false,
              errMess:null
          })
      
        } catch (err) {
          
          errorHandler(err,req,res)
        }
    }
    async login(req:express.Request,res:express.Response){
        try {
            let userData = req.body as LoginUser
            let {id,role} = await userService.login({
              mobile_or_email:userData.mobileOrEmail,
              password:userData.password
            })

            let jwt = await createJwt(id,role,172800)
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
            const userId:string = uuid()
            await registerUserSchema.validate(userData);
            delete userData.confirmPassword
            userData.password = await hashPassword(userData.password)

            const userRole:Role = "customer" 
            let {id,role} = await userService.register({
              id:userId,
              display_name:userData.displayName,
              mobile:userData.mobile,
              email:userData.email,
              password:userData.password,
              role:userRole,
              full_address:userData.district + '|_|' + userData.street + '|_|' + userData.building,
           
            })

            let jwt = await createJwt(id,role,172800)
            
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
          
          let {tel,fullAddress} = await userService.getMobileAndPickUpAddress(jwt.usersId)
          
          
          
          res.json({
              data:{
                district:fullAddress.split('|_|')[0],
                street:fullAddress.split('|_|')[1],
                building:fullAddress.split('|_|')[2],
                tel:tel,
              },
              isErr:false,
              errMess:null
          })
        } catch (err) {
          
          errorHandler(err,req,res)
        }
    }
    
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