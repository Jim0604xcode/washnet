import { errorHandler } from "../../error";
import { IAdminController } from "../routes/routes";
import {Request,Response} from 'express'
import { adminService } from "../service/adminService";
import { JWT,Role } from "../../jwt";
import * as yup from "yup";
import { v4 as uuid } from 'uuid';
import { hashPassword } from "../../bcrypt";
type Status = "w_pickup" | "w_delivery" | "complete"
type OrderType = "pw"|"dc"|"ws"|"lw"|"cs"|"fw"
type Order = {
    orderType:OrderType
    pc:number
    pickupDateTime:string
    deliveryDateTime:string
    tel:string
    district:string
    street:string
    building:string
    remarks:string
    orderStatus:Status
}
export let addOrderSchema = yup.object().shape({
    orderType:yup.string().required(),
    pc:yup.number().required(),
    pickupDateTime: yup.string().required(),
    deliveryDateTime: yup.string().required(),
    tel:yup.string().required(),
    district:yup.string().required(),
    street:yup.string().required(),
    building:yup.string().required(),
    remarks:yup.string().required(),
    
});

type RegUser = {
    id?:string
    displayName:string,
    mobile:string,
    email: string,
    password: string,
    confirmPassword?:string,
    role:Role,
    district:string
    street:string
    building:string
}

export let registerUserSchema = yup.object().shape({
    id:yup.string().required(),
    displayName:yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6, 'must be at least 6 characters long').required(),
    confirmPassword: yup.string().min(6, 'must be at least 6 characters long').required(),
    district:yup.string().required(),
    street:yup.string().required(),
    building:yup.string().required(),
    role:yup.string().required(),
});
export class AdminController implements IAdminController{
    async getUser(req:Request,res:Response){
        try {
       
            let userId = req.params.userId
          
            
            let user = await adminService.getUser(userId)
            
            res.json({
                data:{
                    displayName:user.displayName,
                    mobile:user.mobile,
                    email:user.email,
                    district:user.fullAddress.split('|_|')[0],
                    street:user.fullAddress.split('|_|')[1],
                    building:user.fullAddress.split('|_|')[2],
                },
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async allUserData(req:Request,res:Response){
        try {
            let users = await adminService.getUserAllUser()
            
            res.json({
                data:users,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async allOrderData(req:Request,res:Response){
        try {
            let orders = await adminService.getUserAllOrder()
            
            
            res.json({
                data:orders,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async addOrder(req:Request,res:Response){
        try {
            let jwt = res.locals.jwt as JWT
            let orderData = req.body as Order
            await addOrderSchema.validate(orderData);
            await adminService.addOrder({
                order_type:orderData.orderType,
                pc:orderData.pc,
                pickup_date_time:orderData.pickupDateTime,
                delivery_date_time:orderData.deliveryDateTime,               
                tel:orderData.tel,
                full_address:orderData.district + '|_|' + orderData.street + '|_|' + orderData.building,
                remarks:orderData.remarks,
                status:"w_pickup",
                customer_id:jwt.usersId,
            })
            res.json({
                data:null,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async editOrder(req:Request,res:Response){
        try {
            let jwt = res.locals.jwt as JWT
            if(jwt.role !== "admin" && jwt.role !== "delivery" && jwt.role !== "laundry"){
                throw new Error("You have no permit")
            }
            let orderData = req.body as Order
            let orderId = Number(req.params.id)
            await addOrderSchema.validate(orderData);
            
            // if(
            //     orderData.orderStatus !== "w_pickup" &&
            //     orderData.orderStatus !== "w_delivery" && 
            //     orderData.orderStatus !== "complete"
            // ){
            //     throw new Error("Not correct order status")
            // }
            await adminService.editOrder({
                order_type:orderData.orderType,
                pc:orderData.pc,
                pickup_date_time:orderData.pickupDateTime,
                delivery_date_time:orderData.deliveryDateTime,               
                tel:orderData.tel,
                full_address:orderData.district + '|_|' + orderData.street + '|_|' + orderData.building,
                remarks:orderData.remarks,
                status:orderData.orderStatus,
               
            },orderId)
            res.json({
                data:null,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async getEditor(req:Request,res:Response){
        try {
            let jwt = res.locals.jwt as JWT
            if(jwt.role !== "admin"){
                throw new Error("You aren't Admin")
            }
            let editorType = req.params.editorType
            console.log(editorType)
            const data = await adminService.getEditor(editorType)    
            console.log(data)
            
            res.json({
                data:data,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async editEditor(req:Request,res:Response){
        try {
            let jwt = res.locals.jwt as JWT
            if(jwt.role !== "admin"){
                throw new Error("You aren't Admin")
            }
            let {blocks} = req.body
            let editorType = req.params.editorType
            
            await adminService.editEditor(editorType,blocks)    
            
            
            res.json({
                data:null,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async editUser(req:Request,res:Response){
        try {
            let jwt = res.locals.jwt as JWT
            if(jwt.role !== "admin"){
                throw new Error("You aren't Admin")
            }
            let userData = req.body
            let userId = req.params.userId
            await adminService.editUser({
                userId:userId,
                display_name:userData.displayName,
                mobile:userData.mobile,
                email:userData.email,
                full_address:userData.district + '|_|' + userData.street + '|_|' + userData.building,
            })    
            
            
            res.json({
                data:{userId:userId},
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async addUser(req:Request,res:Response){
        try {
            let jwt = res.locals.jwt as JWT
            if(jwt.role !== "admin"){
                throw new Error("You aren't Admin")
            }
            let userData = req.body as RegUser
            
            if(userData.password !== userData.confirmPassword){
                throw new Error('password not match!')
            }
            userData.id = uuid() as string
            await registerUserSchema.validate(userData);
            delete userData.confirmPassword
            userData.password = await hashPassword(userData.password)
            console.log(userData)
            
            
            await adminService.addUser({
              id:userData.id,
              display_name:userData.displayName,
              mobile:userData.mobile,
              email:userData.email,
              password:userData.password,
              role:userData.role,
              full_address:userData.district + '|_|' + userData.street + '|_|' + userData.building,
            })

            
            res.json({
                data:{userId:userData.id},
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async getLanguageData(req:Request,res:Response){
        try {
        
        let require = req.params.require as "cn" | "eng"
        
        
          let languageData = await adminService.getLan(require)
          
          res.json({
            data:languageData,
            isErr:false,
            errMess:null
          })
           
        }catch(err){
          errorHandler(err,req,res)
        }
    }

    async getPickUpAddressAndMobile(req:Request,res:Response){
        try{
            let orderId = Number(req.params.id)
            let {fullAddress} = await adminService.getPickUpAddress(orderId)
            let jwt = res.locals.jwt as JWT
            let {tel} = await adminService.getMobile(jwt.usersId)  
            // console.log(fullAddress,orderStatus)
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
        }catch(err){
            errorHandler(err,req,res)
        }
    }
}
