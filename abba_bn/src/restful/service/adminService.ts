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
type EditOrder = {
    order_type:OrderType
    pc:number
    pickup_date_time:string
    delivery_date_time:string
    tel:string
    full_address:string
    remarks:string
    status:Status

}
class AdminService{
    constructor(protected knex:Knex) {
     
    }
    async getUser(userId:string){
        const txn = await this.knex.transaction()
        try {
            let [result] = await txn.select("users.display_name as displayName","users.mobile","users.email","customer_meta.area","customer_meta.street","customer_meta.location").from("users").join("customer_meta","customer_meta.customer_id","users.id").orderBy("users.created_at","desc")
            await txn.commit()
            return result
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async getUserAllUser(){
        const txn = await this.knex.transaction()
        try {
            let result = await txn.select("id as userId","display_name as displayName","mobile","email","role").from("users").orderBy("users.created_at","desc")
            await txn.commit()
            return result
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }    
    }
    async getUserAllOrder(){
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
    async editOrder(orderData:EditOrder,orderId:number){
        const txn = await this.knex.transaction()
        
        try{
            let [result] = await txn.select("users.id").from("users").join("orders","orders.customer_id","users.id").where("orders.id",orderId)
            console.log('admin service 87',result)
            orderData = Object.assign(orderData,{customer_id:result.id}) as Order
            console.log(orderData)
            await txn("orders").update(orderData).where("id",orderId) 
            
            await txn.commit()
            return
        }catch(err){
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
        
    }
    async editBanner(id:number,block:any){
        const txn = await this.knex.transaction()
        console.log(id,block)
        try{
            // let [result] = await txn.select("users.id").from("users").join("orders","orders.customer_id","users.id").where("orders.id",orderId)
            // console.log('admin service 87',result)
            // orderData = Object.assign(orderData,{customer_id:result.id}) as Order
            // console.log(orderData)
            // await txn("orders").update(orderData).where("id",orderId) 
            
            await txn.commit()
            return
        }catch(err){
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
}    

export let adminService = new AdminService(knex)