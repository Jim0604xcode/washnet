import express from "express";
import { errorHandler } from '../../error';
import * as yup from "yup";
import { IUserController } from "../routes/routes";
import { JWT,Role,createJwt } from "../../jwt";
import { v4 as uuid } from 'uuid';
import { hashPassword } from "../../bcrypt";
import { userService } from "../service/userService";

import { env_config } from "../../env";
// import {google} from 'googleapis'
import sgMail from '@sendgrid/mail'
// @ts-ignore
// import fetch from 'node-fetch';




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


    

    // async authCodeCallback(req:express.Request,res:express.Response){
    //   console.log(req.query.code)
    //   const CLIENT_ID = '116868407254-0dju0qqkm92mdaoltcplkc25l55n6vtq.apps.googleusercontent.com';
    //   const CLIENT_SECRET = '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';
    //   // const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
    //   const REDIRECT_URL = "http://localhost:8080/user/oauth2callback"
    //   // const REFRESH_TOKEN = "1//04KRnqPrv7xJoCgYIARAAGAQSNwF-L9Ir3RM7hpIttG_rNA0zftsDOUk0-TwygGUy2bUMSlVmHAlPT-spDHpOdVnF2Dx5j2mE48U"
    //   const code = req.query.code as string
    //   const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
    //   oAuth2Client.getToken(code, async (err, tokens) => {
    //     if (err) {
    //       console.error('無法獲取access token:', err);
    //       return;
    //     }
      
    //     // 保存access token
    //     // oAuth2Client.setCredentials(tokens!);
    //     console.log('Access Token:', tokens?.access_token);
    //     // const accessToken = tokens?.access_token as string
    //     // console.log(fetch)
    //     const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token='+tokens?.access_token)
    //     const clientObj = await response.json()
    //     console.log(clientObj)
    //     let {userId,role} = await userService.forgetPass(clientObj.email)
        
    //     let jwt = await createJwt(userId,role,300)
        
        
    //     sendEmail(clientObj.email,jwt)
        

    //   });
    //   res.json(req.query.code)
    // }
    async forgetPassword(req:express.Request,res:express.Response){
      try {
        let userData = req.body as {mobileOrEmail:string}
        
        
        let {userId,role,email} = await userService.forgetPass(userData.mobileOrEmail)
        let token = await createJwt(userId,role,300)
        // console.log(userId,role,email)

        const secret = env_config.EMAIL_KEY
        sgMail.setApiKey(secret);
      
        const msg = {
          to: 'logbechan@gmail.com',
          from: email,
          subject: 'Password Reset',
          text: `Click the following link to reset your password: ${env_config.PORTAL_HOST}/reset-password/${token}`
        };
      
        sgMail.send(msg).catch((err) => {
          throw new Error(`${JSON.stringify(err)}`)
        });
        



        res.json({
          data:null,
          isErr:false,
          errMess:null
        })

      } catch (err) {
        // console.log(err.message)  
        errorHandler(err,req,res)
      }
    }
    // async forgetPassword(req:express.Request,res:express.Response){
    //   try {
    //   const CLIENT_ID = '116868407254-0dju0qqkm92mdaoltcplkc25l55n6vtq.apps.googleusercontent.com';
    //   const CLIENT_SECRET = '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';
    //   // const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
    //   const REDIRECT_URL = "http://localhost:8080/user/oauth2callback"
    //   // const REFRESH_TOKEN = "1//04KRnqPrv7xJoCgYIARAAGAQSNwF-L9Ir3RM7hpIttG_rNA0zftsDOUk0-TwygGUy2bUMSlVmHAlPT-spDHpOdVnF2Dx5j2mE48U"

    //   const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

    //   // 生成授權URL,引導用戶進行授權
    //   const authUrl = oAuth2Client.generateAuthUrl({
    //     access_type: 'offline',
    //     scope: ['https://www.googleapis.com/auth/userinfo.email']
    //   });
    //   console.log('授權URL:', authUrl);

    //   // const accessToken = ""

    //   // const transporter: Transporter<any> = nodemailer.createTransport({
    //   //   service: 'gmail', // 或者其他支持的郵件服務名稱
    //   //   auth: {
    //   //     type: 'OAuth2',
    //   //     user: 'logbechan@gmail.com',
    //   //     clientId: CLIENT_ID,
    //   //     clientSecret: CLIENT_SECRET,
    //   //     // refreshToken:REFRESH_TOKEN,
    //   //     accessToken:accessToken            
    //   //   },
    //   // });
    //   // const mailOptions = {
    //   //   from: "codemasterpro1314@gmail.com",
    //   //   to: clientObj.email,
    //   //   subject: 'Password Reset',
    //   //   text: `Click the following link to reset your password: ${env_config.PORTAL_HOST}/reset-password/${token}`,
    //   // };
    //   // await transporter.sendMail(mailOptions)
        
    //     res.json({
    //       data:null,
    //       isErr:false,
    //       errMess:null
    //     })

    //   } catch (err) {
    //     console.log(err.message)  
    //     // errorHandler(err,req,res)
    //   }
    // }
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
          let userData = req.body as {mobile:string}
          await userService.editUserMobile(jwt.usersId,{mobile:userData.mobile});

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

// const sendEmail = async (clientEmail:string,jwt:string) => {
  // const id = "cdbccda855440c113f3358c9ce3c4d60"
  // const secret = env_config.EMAIL_KEY
  // const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(secret);

// const msg = {
//     to: 'logbechan@gmail.com',
//     from: 'logbechan@gmail.com',
//     subject: 'Password Reset',
//     text: `Click the following link to reset your password: ${env_config.PORTAL_HOST}/reset-password/${jwt}`
// };

// sgMail.send(msg)
//     .then(() => {
//         console.log('Email sent');
//     })
//     .catch((error:any) => {
//         console.error(JSON.stringify(error));
//     });
// }
// const sendEmail2 = async (accessToken:string,clientEmail:string,jwt:string) => {
//   const CLIENT_ID = '116868407254-0dju0qqkm92mdaoltcplkc25l55n6vtq.apps.googleusercontent.com';
//       const CLIENT_SECRET = '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';
//       const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
//       const REFRESH_TOKEN = "1//04KRnqPrv7xJoCgYIARAAGAQSNwF-L9Ir3RM7hpIttG_rNA0zftsDOUk0-TwygGUy2bUMSlVmHAlPT-spDHpOdVnF2Dx5j2mE48U"

//       const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
//       oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
//       // const accessToken:any = await oAuth2Client.getAccessToken();
//       // console.log(oAuth2Client)
//         // let jwt = res.locals.jwt as JWT
//         // let {email} = await userService.forgetPass(jwt.usersId)
//         // let token = await createJwt(jwt.usersId,jwt.role,300)
//         const transporter: Transporter<any> = nodemailer.createTransport({
//           service: 'gmail', // 或者其他支持的郵件服務名稱
//           auth: {
//             type: 'OAuth2',
//             user: 'logbechan@gmail.com',
//             clientId: CLIENT_ID,
//             clientSecret: CLIENT_SECRET,
//             refreshToken:REFRESH_TOKEN,
//             accessToken:accessToken            
//           },
//         });
//         const mailOptions = {
//           from: "codemasterpro1314@gmail.com",
//           to: clientEmail,
//           subject: 'Password Reset',
//           text: `Click the following link to reset your password: ${env_config.PORTAL_HOST}/reset-password/${jwt}`,
//         };
//         await transporter.sendMail(mailOptions)
// }