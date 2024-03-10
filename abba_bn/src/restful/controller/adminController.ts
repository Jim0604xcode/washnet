import { errorHandler } from "../../error";
import { IAdminController } from "../routes/routes";
import {Request,Response} from 'express'
import { adminService } from "../service/adminService";
import { JWT } from "../../jwt";
import * as yup from "yup";
import { orderItemsDecode, orderItemsEncode } from "../../helper";
type Status = "w_pickup" | "w_quote" | "w_clean" | "w_delivery" | "complete"
type Order = {
    address:string
    area:string
    // area_value:string
    district:string
    // district_value:string
    dryCleaning:number
    leatherWashBag:number
    pickupDateTime:string
    poundWash:number
    remarks:string
    station:string
    // station_value:string
    totalPic:number
    washShoes:number
    orderStatus?:Status
}
export let addOrderSchema = yup.object().shape({
    address:yup.string().required(),
    area:yup.string().required(),
    district: yup.string().required(),
    dryCleaning: yup.number().positive().required(),
    leatherWashBag: yup.number().positive().required(),
    pickupDateTime: yup.string().required(),
    poundWash:yup.number().positive().required(),
    remarks:yup.string().required(),
    station:yup.string().required(),
    totalPic:yup.number().positive().required(),
    washShoes:yup.number().positive().required(),
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
            orders = orders.map(obj=>{
                Object.assign(obj,orderItemsDecode(obj.order_items))
                delete obj.order_items
                return obj
            })
            
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
            let order_items = orderItemsEncode(orderData.poundWash,orderData.dryCleaning,orderData.washShoes,orderData.leatherWashBag,orderData.totalPic)
            let area_value = orderData.area.split("@")[0]
            orderData.area = orderData.area.split("@")[1]
            let district_value = orderData.district.split("@")[0]
            orderData.district = orderData.district.split("@")[1]
            let station_value = orderData.station.split("@")[0]
            orderData.station = orderData.station.split("@")[1]
            await adminService.addOrder({
                order_items:order_items,
                pickup_date_time:orderData.pickupDateTime,
                customer_id:jwt.usersId,
                area:orderData.area,
                area_value:area_value,
                district:orderData.district,
                district_value:district_value,
                station:orderData.station,
                station_value:station_value,
                address:orderData.address,
                remarks:orderData.remarks,
                status:"w_pickup"

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
            let order_items = orderItemsEncode(orderData.poundWash,orderData.dryCleaning,orderData.washShoes,orderData.leatherWashBag,orderData.totalPic)
            let area_value = orderData.area.split("@")[0]
            orderData.area = orderData.area.split("@")[1]
            let district_value = orderData.district.split("@")[0]
            orderData.district = orderData.district.split("@")[1]
            let station_value = orderData.station.split("@")[0]
            orderData.station = orderData.station.split("@")[1]
            if(
                orderData.orderStatus !== "w_pickup" &&
                orderData.orderStatus !== "w_quote" &&
                orderData.orderStatus !== "w_clean" &&
                orderData.orderStatus !== "w_delivery" && 
                orderData.orderStatus !== "complete"
            ){
                throw new Error("Not correct order status")
            }
            await adminService.editOrder({
                order_items:order_items,
                pickup_date_time:orderData.pickupDateTime,
                // customer_id:jwt.usersId,
                area:orderData.area,
                area_value:area_value,
                district:orderData.district,
                district_value:district_value,
                station:orderData.station,
                station_value:station_value,
                address:orderData.address,
                remarks:orderData.remarks,
                status:orderData.orderStatus
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
}
