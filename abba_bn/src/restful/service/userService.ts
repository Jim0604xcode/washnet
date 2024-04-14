import { Knex } from "knex"
import { knex } from "../../db"
import { Role } from "../../jwt"
import { checkPassword } from "../../bcrypt"
type LoginUser = {
    mobile_or_email:string
    password:string
}
type RegUser = {
    id:string
    display_name:string,
    mobile:string,
    email: string,
    password: string,
    role:Role

    area:string,
    street:string,
    location:string,
    
    
    
}
export class UserService {
    constructor(protected knex:Knex) {
     
    }
    
    async login(userData:LoginUser){
        const txn = await this.knex.transaction()
        try {
            
            let result = await this.knex.select("id","role","password").from("users").where("mobile",userData.mobile_or_email).orWhere("email",userData.mobile_or_email)
            if(result.length === 0){
                throw new Error('Not exist this user')
            }
            let checked = checkPassword(userData.password,result[0].password)
            if(!checked){
                throw new Error('password not match')
            }
            await txn.commit()
            return result[0]
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
        
        
    }
    async register (userData:RegUser){
        const txn = await this.knex.transaction()
        try{

            let [result] = await txn.insert([
                {
                    id:userData.id,
                    display_name:userData.display_name,
                    mobile:userData.mobile,
                    email:userData.email,
                    password:userData.password,
                    role:userData.role
                }]).into("users").returning(["id","role"])
            await txn.insert([
                {
                    area:userData.area,
                    
                    street:userData.street,
                    
                    location:userData.location,
                    
                    customer_id:userData.id

                }
            ]).into("customer_meta")
            await txn.commit()
            return result
        }catch(err){
            await txn.rollback();
            throw new Error(`${err.message}`)
        }    
    }
    async getCurrentUser(userId:string){
        const txn = await this.knex.transaction()
        try {
            
            let result = await txn.select("role").from("users").where("id",userId)
            if(result.length === 0){
                throw new Error('Not exist this user')
            }
            await txn.commit()
            return result[0]
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
        
    }
    async getPickUpAddress(userId:string){
        const txn = await this.knex.transaction()
        try {
            
            let result = await txn.select("area","street","location").from("customer_meta").where("customer_id",userId)
            if(result.length === 0){
                throw new Error('Not exist this user')
            }
            await txn.commit()
            return result[0]
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
        
    }
    async getLan(reqLan:`cn`|`eng`){
        const txn = await this.knex.transaction()
        try {
            
            if(reqLan === "cn"){
                let result = await txn.select("cn").from("languague")
                await txn.commit()
                return result[0].cn
            }else if(reqLan === "eng"){
                let result = await txn.select("eng").from("languague")
                await txn.commit()
                return result[0].eng
            }
            
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
}


export const userService = new UserService(knex)