import { Knex } from "knex"
import { knex } from "../../db"
import { Role } from "../../jwt"
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
type RegUser = {
    id:string
    display_name:string,
    mobile:string,
    email: string,
    password: string,
    role:Role
    full_address:string
    
    
}

class AdminService{
    constructor(protected knex:Knex) {
     
    }
    async addUser(userData:RegUser){
        const txn = await this.knex.transaction()
        try{

            await txn.insert([
                {
                    id:userData.id,
                    display_name:userData.display_name,
                    mobile:userData.mobile,
                    email:userData.email,
                    password:userData.password,
                    role:userData.role,
                    status:"active"
                }]).into("users").returning(["id","role"])
            
                if(userData.role==="admin"){
                    await txn.insert([
                        {
                            work_location:userData.full_address,
                            staff_id:userData.id
                        }
                    ]).into("staff_meta")
                }
                if(userData.role==="customer"){
                    await txn.insert([
                        {
                            full_address:userData.full_address,
                            customer_id:userData.id
                        }
                    ]).into("customer_meta")
                }
                
            await txn.commit()
            return
        }catch(err){
            await txn.rollback();
            throw new Error(`${err.message}`)
        }    
    }
    async getUser(userId:string):Promise<{role:string,displayName:string,mobile:string,email:string,fullAddress:string}|any>{
        const txn = await this.knex.transaction()
        try {
        let [row] = await txn.select("role").from("users").where("id",userId);
            console.log(row)
            
            if(row.role==="admin"){
                let [result] = await txn.select("users.display_name as displayName","users.mobile","users.email","staff_meta.work_location as fullAddress","users.status").from("users")
                .join("staff_meta","staff_meta.staff_id","users.id")
                .where("users.id",userId)
                .orderBy("users.created_at","desc")
                await txn.commit()
                
                return result
            }
            if(row.role==="customer"){
                let [result] = await txn.select("users.display_name as displayName","users.mobile","users.email","customer_meta.full_address as fullAddress","users.status").from("users")
                .join("customer_meta","customer_meta.customer_id","users.id")
                .where("users.id",userId)
                .orderBy("users.created_at","desc")
                await txn.commit()
                
                return result
            }
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    
    async getUserAllUser(){
        const txn = await this.knex.transaction()
        try {
            let result = await txn.select("id as userId","display_name as displayName","mobile","email","role","status").from("users").orderBy("users.created_at","desc")
            await txn.commit()
            return result
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }    
    }
    async getUserAllOrder(role:string){
        const txn = await this.knex.transaction()
        try {
            let result
            if(role === "admin"){
                result = await txn.select("id as orderId","order_type as orderType","pc","tel","pickup_date_time as pickupDateTime","delivery_date_time as deliveryDateTime","full_address as fullAddress","remarks","status as orderStatus").from("orders").orderBy("orders.created_at","desc")    
            }
            if(role === "delivery"){
                result = await txn.select("id as orderId","order_type as orderType","pc","tel","pickup_date_time as pickupDateTime","delivery_date_time as deliveryDateTime","full_address as fullAddress","remarks","status as orderStatus").from("orders").where("status","w_pickup").orWhere("status","w_delivery").orderBy("orders.created_at","desc")
            }
            if(role === "laundry"){
                result = await txn.select("id as orderId","order_type as orderType","pc","tel","pickup_date_time as pickupDateTime","delivery_date_time as deliveryDateTime","full_address as fullAddress","remarks","status as orderStatus").from("orders").where("status","w_service").orderBy("orders.created_at","desc")    
            }
            
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

    async getEditor(editorType:string):Promise<{editorType:string,blocks:string}>{
        const txn = await this.knex.transaction()

        try{
            
            let [result] = await txn.select("editor_type as editorType","blocks").from("editor").where("editor_type",editorType)
            await txn.commit()
            return result
        }catch(err){
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async editEditor(editorType:string,blocks:any){
        const txn = await this.knex.transaction()

        console.log(editorType,blocks)
        try{
            
            await txn("editor").update('blocks', JSON.stringify(blocks)).where("editor_type",editorType) 
            
            await txn.commit()
            return
        }catch(err){
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async editMessagongToken(userId:string,obj:{cloud_messaging_token:string}){
        const txn = await this.knex.transaction()
        try {
            await txn("customer_meta").update(obj).where("customer_id",userId)
            await txn.commit()
            return 
        }catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async editUser({userId,display_name,mobile,email,full_address}:{userId:string,display_name:string,mobile:string,email:string,full_address:string}){
        const txn = await this.knex.transaction()
        try {
            
            await txn("users").update({"display_name":display_name,"mobile":mobile,"email":email}).where("id",userId) 
            await txn("customer_meta").update({"full_address":full_address}).where("customer_id",userId)
            await txn.commit()
            return 
            
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async getLan(reqLan:`cn`|`eng`){
        const txn = await this.knex.transaction()
        try {
            
            if(reqLan === "cn"){
                let result = await txn.select("cn").from("languague_portal")
                await txn.commit()
                return result[0].cn
            }else if(reqLan === "eng"){
                let result = await txn.select("eng").from("languague_portal")
                await txn.commit()
                return result[0].eng
            }
            
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }

    async getPickUpAddress(orderId:number):Promise<{fullAddress:string,orderStatus:string}>{
        const txn = await this.knex.transaction()
        try {
            let userRow = await txn.select("customer_id").from("orders").where("id",orderId)
            // console.log(userRow)
            if(userRow.length === 0){
                throw new Error('Not exist this order')
            }
            // console.log(userRow)
            let result = await txn.select("full_address as fullAddress").from("customer_meta").where("customer_id",userRow[0].customer_id)
            if(result.length === 0){
                throw new Error('Not exist this user')
            }
            await txn.commit()
            // Object.assign(result[0],{orderStatus:userRow[0].status})
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

export let adminService = new AdminService(knex)