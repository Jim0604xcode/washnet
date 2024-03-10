import { Knex } from "knex"
import { knex } from "../../db"

type Status = "w_pickup" | "w_quote" | "w_clean" | "w_delivery" | "complete"
type AddOrder = {
    order_items:string
    area:string
    area_value:string
    district:string
    district_value:string
    station:string
    station_value:string
    address:string
    pickup_date_time:string
    remarks:string
    status:Status
    customer_id:string
}
class OrderService{
    constructor(protected knex:Knex) {
     
    }
    async addOrder(orderData:AddOrder){
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
    async getOrderItems(id:number):Promise<{order_items:string}>{
        const txn = await this.knex.transaction()
        try {
            
            let result = await txn.select("order_items").from("orders").where("id",id)
            if(result.length === 0){
                throw new Error('Not exist this order')
            }
            await txn.commit()
            return result[0]
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async getUserAllOrder(userId:string,role:string):Promise<{order_items:string}[]>{
        const txn = await this.knex.transaction()
        try {
            
            let result = await txn.select("orders.*").from("orders").join("users","users.id","orders.customer_id").where("orders.customer_id",userId).andWhere("orders.status","w_pickup").orderBy("orders.created_at","desc")
            
            await txn.commit()
            return result
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async getDeliveryWaitPickup(){
        const txn = await this.knex.transaction()
        try {
            let result = await txn.select("*").from("orders").join("users","users.id","orders.customer_id").where("status","w_pickup").orderBy([
                {column: 'area', order: 'desc'},
                {column: 'district', order: 'desc'},
                {column: 'station', order: 'desc'},
            ])
            await txn.commit()
            return result
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async getPickUpAddress(orderId:number){
        const txn = await this.knex.transaction()
        try {
            let userRow = await txn.select("customer_id").from("orders").where("id",orderId)
            if(userRow.length === 0){
                throw new Error('Not exist this order')
            }
            console.log(userRow)
            let result = await txn.select("area","district","station","address").from("customer_meta").where("customer_id",userRow[0].customer_id)
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