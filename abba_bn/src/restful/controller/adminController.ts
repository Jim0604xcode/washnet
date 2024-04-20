import { errorHandler } from "../../error";
import { IAdminController } from "../routes/routes";
import {Request,Response} from 'express'
import { adminService } from "../service/adminService";
import { JWT } from "../../jwt";
import * as yup from "yup";

type Status = "w_pickup" | "w_delivery" | "complete"
type OrderType = "pw"|"dc"|"ws"|"lw"|"cs"|"fw"
type Order = {
    orderType:OrderType
    pc:number
    pickupDateTime:string
    deliveryDateTime:string
    tel:string
    fullAddress:string
    remarks:string
    orderStatus:Status
}
export let addOrderSchema = yup.object().shape({
    orderType:yup.string().required(),
    pc:yup.number().required(),
    pickupDateTime: yup.string().required(),
    deliveryDateTime: yup.string().required(),
    tel:yup.string().required(),
    fullAddress:yup.string().required(),
    remarks:yup.string().required(),
    
});
export class AdminController implements IAdminController{
    async getUser(req:Request,res:Response){
        try {
       
            let userId = req.params.userId
          
            
            let user = await adminService.getUser(userId)
            
            res.json({
                data:user,
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
                full_address:orderData.fullAddress,
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
            if(jwt.role !== "admin"){
                throw new Error("You aren't Admin")
            }
            let orderData = req.body as Order
            let orderId = Number(req.params.id)
            await addOrderSchema.validate(orderData);
            
            if(
                orderData.orderStatus !== "w_pickup" &&
                orderData.orderStatus !== "w_delivery" && 
                orderData.orderStatus !== "complete"
            ){
                throw new Error("Not correct order status")
            }
            await adminService.editOrder({
                order_type:orderData.orderType,
                pc:orderData.pc,
                pickup_date_time:orderData.pickupDateTime,
                delivery_date_time:orderData.deliveryDateTime,               
                tel:orderData.tel,
                full_address:orderData.fullAddress,
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
    async editBanner(req:Request,res:Response){
        try {
            let jwt = res.locals.jwt as JWT
            if(jwt.role !== "admin"){
                throw new Error("You aren't Admin")
            }
            let {blocks} = req.body
            let id = Number(req.params.id)
            
            await adminService.editBanner(id,blocks)
            res.json({
                data:null,
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
}
