import express from "express";
import { errorHandler } from '../../error';
import * as yup from "yup";
import { IOrderController } from "../routes/routes";

import { orderService } from "../service/orderService";
import { JWT } from "../../jwt";
import { Twilio } from "twilio";
import { env_config } from "../../env";
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
    remarks:yup.string(),
});
export class OrderController implements IOrderController{
    async addOrder(req:express.Request,res:express.Response){
        try {
            let jwt = res.locals.jwt as JWT
            let orderData = req.body as Order
            let orderStatus:Status = "w_pickup"
            await addOrderSchema.validate(orderData);
            await orderService.addOrder({
                order_type:orderData.orderType,
                pc:orderData.pc,
                pickup_date_time:orderData.pickupDateTime,
                delivery_date_time:orderData.deliveryDateTime,               
                tel:orderData.tel,
                full_address:orderData.district + '|_|' + orderData.street + '|_|' + orderData.building,
                remarks:orderData.remarks,
                status:orderStatus,
                customer_id:jwt.usersId,
                // customer_id:'dKZ7MVCGhCc9kJ1JYeob6qXlYcF3',
            })
            const accountSid = env_config.TWILIO_SID;
            const authToken = env_config.TWILIO_TOKEN;
            const client = new Twilio(accountSid, authToken);
            client.messages
            .create({
            from: '+12182824605',
            to: '+85259178802',
            body: `New Order from mobile: ${orderData.tel}!`,
            }).catch((err:any) => {
                // You can implement your fallback code here
                throw new Error(err.messages)
            });
            res.json({
                data:null,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
    async getUserAllOrder(req:express.Request,res:express.Response){
        try {
            let jwt = res.locals.jwt as JWT
            let orders = await orderService.getUserAllOrder(jwt.usersId,jwt.role)
            orders = orders.map(obj=>Object.assign(obj,{
                district:obj.fullAddress.split('|_|')[0],
                street:obj.fullAddress.split('|_|')[1],
                building:obj.fullAddress.split('|_|')[2]
            }))
            res.json({
                data:orders,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }

    async getUserCurrentOrders(req:express.Request, res:express.Response){
        try {
            let jwt = res.locals.jwt as JWT;
            let orders = await orderService.getUserCurrentOrders(jwt.usersId);
            orders = orders.map(obj => 
                Object.assign(obj, {
                    district: obj.fullAddress.split('|_|')[0],
                    street: obj.fullAddress.split('|_|')[1],
                    building: obj.fullAddress.split('|_|')[2]
                })
            );
            res.json({data: orders, isErr: false, errMess: null});
        } catch (err) {
            errorHandler(err, req, res);
        }
    }

    async getUserOrderHistory(req:express.Request, res:express.Response){
        try {
            let jwt = res.locals.jwt as JWT;
            let orders = await orderService.getUserOrderHistory(jwt.usersId);
            orders = orders.map(obj => 
                Object.assign(obj, {
                    district: obj.fullAddress.split('|_|')[0],
                    street: obj.fullAddress.split('|_|')[1],
                    building: obj.fullAddress.split('|_|')[2]
                })
            );
            res.json({data: orders, isErr: false, errMess: null});
        } catch (err) {
            errorHandler(err, req, res);
        }
    }
    
    async getPickUpAddressAndMobile(req:express.Request,res:express.Response){
        try{
            let orderId = Number(req.params.id)
            let {fullAddress} = await orderService.getPickUpAddress(orderId)
            let jwt = res.locals.jwt as JWT
            let {tel} = await orderService.getMobile(jwt.usersId)  
            res.json({
              data:{
                district:fullAddress.split('|_|')[0],
                street:fullAddress.split('|_|')[1],
                building:fullAddress.split('|_|')[2],
                tel:tel
              },
              isErr:false,
              errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
}