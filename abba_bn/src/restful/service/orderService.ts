import { Knex } from "knex"
import { knex } from "../../db"

type Status = "w_pickup" | "w_quote" | "w_clean" | "w_delivery" | "complete"
type OrderType = "pw"|"dc"|"ws"|"lw"|"cs"|"fw"

type Order = {
    order_type:OrderType
    pc:number
    pickup_date_time:string
    delivery_date_time:string
    tel:string
    full_address:string
    remarks:string
    status:Status
    customer_id:string
}
class OrderService{
    constructor(protected knex:Knex) {
     
    }
    async addOrder(orderData:Order){
        const txn = await this.knex.transaction()
    
        try{
            await txn.insert([orderData]).into("orders")
            await txn.commit()
            return
        }catch(err){
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
        
    }
    
    async getUserAllOrder(userId:string,role:string){
        const txn = await this.knex.transaction()
        try {
            
            let result = await txn.select("id as orderId","order_type as orderType","pc","tel","pickup_date_time as pickupDateTime","delivery_date_time as deliveryDateTime","full_address as fullAddress","remarks","status as orderStatus").from("orders").orderBy("orders.created_at","desc")
            
            await txn.commit()
            return result
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }

    async getUserCurrentOrders(userId: string) {
        const txn = await this.knex.transaction();
        try {
            
            let result = await txn.select(
                    "id as orderId",
                    "order_type as orderType",
                    "pc",
                    "tel",
                    "pickup_date_time as pickupDateTime",
                    "delivery_date_time as deliveryDateTime",
                    "full_address as fullAddress",
                    "remarks",
                    "status as orderStatus")
                .from("orders")
                .where("customer_id", userId)
                .andWhere("status", "<>", "complete")
                .orderBy("orders.created_at", "desc");
            
            await txn.commit();
            return result;
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`);
        }
    }
    
    async getUserOrderHistory(userId: string) {
        const txn = await this.knex.transaction();
        try {
            let result = await txn.select(
                    "id as orderId",
                    "order_type as orderType",
                    "pc",
                    "tel",
                    "pickup_date_time as pickupDateTime",
                    "delivery_date_time as deliveryDateTime",
                    "full_address as fullAddress",
                    "remarks",
                    "status as orderStatus")
                .from("orders")
                .where("customer_id", userId)
                .orderBy("orders.created_at", "desc");
            
            await txn.commit();
            return result;
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`);
        }
    }

    async getPickUpAddress(orderId:number):Promise<{fullAddress:string}>{
        const txn = await this.knex.transaction()
        try {
            let userRow = await txn.select("customer_id").from("orders").where("id",orderId)
            if(userRow.length === 0){
                throw new Error('Not exist this order')
            }
            console.log(userRow)
            let result = await txn.select("full_address as fullAddress").from("customer_meta").where("customer_id",userRow[0].customer_id)
            if(result.length === 0){
                throw new Error('Not exist this user')
            }
            await txn.commit()
            return result[0]
        }catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async getMobile(userId:string):Promise<{tel:string}>{
        const txn = await this.knex.transaction()
        try {
            let result = await txn.select("mobile as tel").from("users").where("id",userId)
            if(result.length === 0){
                throw new Error('Not exist this user')
            }            
            await txn.commit()
            return result[0]

        }catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
}

export let orderService = new OrderService(knex)