import express from "express";
import { errorHandler } from '../../error';
import * as yup from "yup";
import { IOrderController } from "../routes/routes";
import { Items, orderItemsDecode, orderItemsEncode } from "../../helper";
import { orderService } from "../service/orderService";
import { JWT } from "../../jwt";
// type Status = "w_pickup" | "w_quote" | "w_clean" | "w_delivery" | "complete"
type AddOrder = {
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
    // status:Status
}
export let addOrderSchema = yup.object().shape({
    address:yup.string().required(),
    area:yup.string().required(),
    district: yup.string().required(),
    dryCleaning: yup.number().required(),
    leatherWashBag: yup.number().required(),
    pickupDateTime: yup.string().required(),
    poundWash:yup.number().required(),
    remarks:yup.string().required(),
    station:yup.string().required(),
    totalPic:yup.number().positive().required(),
    washShoes:yup.number().required(),
});
export class OrderController implements IOrderController{
    async addOrder(req:express.Request,res:express.Response){
        try {
            let jwt = res.locals.jwt as JWT
            let orderData = req.body as AddOrder
            await addOrderSchema.validate(orderData);
            let order_items = orderItemsEncode(orderData.poundWash,orderData.dryCleaning,orderData.washShoes,orderData.leatherWashBag,orderData.totalPic)
            let area_value = orderData.area.split("@")[0]
            orderData.area = orderData.area.split("@")[1]
            let district_value = orderData.district.split("@")[0]
            orderData.district = orderData.district.split("@")[1]
            let station_value = orderData.station.split("@")[0]
            orderData.station = orderData.station.split("@")[1]
            await orderService.addOrder({
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

    async getOrderItems(req:express.Request,res:express.Response){
        try {
            let orderId = Number(req.params.id)
            
            let {order_items} = await orderService.getOrderItems(orderId)
            let result:Items = orderItemsDecode(order_items)
            res.json({
                data:result,
                isErr:false,
                errMess:null
            })
          } catch (err) {
            errorHandler(err,req,res)
          }
    }

    async getUserAllOrder(req:express.Request,res:express.Response){
        try {
            let jwt = res.locals.jwt as JWT
            
            let orders = await orderService.getUserAllOrder(jwt.usersId,jwt.role)
            
            res.json({
                data:orders,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async getDeliveryWaitPickup(req:express.Request,res:express.Response){
        try {
            // let jwt = res.locals.jwt as JWT
            let orders = await orderService.getDeliveryWaitPickup()

            res.json({
                data:orders,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }   
    async getOrderPickUpAddress(req:express.Request,res:express.Response){
        try{
            let orderId = Number(req.params.id)
            let {area,district,station,address} = await orderService.getPickUpAddress(orderId)
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
        }catch(err){
            errorHandler(err,req,res)
        }
    }
}