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
    full_address:string
    
    
}
export class UserService {
    constructor(protected knex:Knex) {
     
    }
    async resetPass(userId:string,password:string){
        const txn = await this.knex.transaction()
        try {
            await txn("users").update("password",password).where("id",userId).andWhere("status","active")
            
            await txn.commit()
            return 
        }catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async forgetPass(userId:string){
        const txn = await this.knex.transaction()
        try {
            let result = await txn.select("email").from("users").where("id",userId).andWhere("status","active")
            
            await txn.commit()
            return result[0]
        }catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async editUser(userId:string,obj:any){
        const txn = await this.knex.transaction()
        try {
            await txn("users").update(obj).where("id",userId)
            await txn.commit()
            return
        }catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async delUser(userId:string){
        const txn = await this.knex.transaction()
        try {
            await txn("users").update("status","non_active").where("id",userId)
            await txn.commit()
            return
        }catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
    }
    async login(userData:LoginUser){
        const txn = await this.knex.transaction()
        try {
            console.log(userData.mobile_or_email)
            console.log(userData.password)

            let result = await txn.select("id","role","password","status").from("users")
            .where("mobile",userData.mobile_or_email)
            .orWhere("email",userData.mobile_or_email)
            console.log(result[0])
            if(result.length === 0){
                throw new Error('Not exist this user')
            }
            if(result[0].status==="non_active"){
                throw new Error('Non active user')
            }
            let checked = await checkPassword(userData.password,result[0].password);
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
                    role:userData.role,
                    status:"active"
                }]).into("users").returning(["id","role"])
            await txn.insert([
                {
                    full_address:userData.full_address,
                    
                    
                    
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
            
            let result = await txn.select("role","status").from("users").where("id",userId)
            if(result.length === 0){
                throw new Error('Not exist this user')
            }
            if(result[0].status==="non_active"){
                throw new Error('Non active user')
            }
            await txn.commit()
            return result[0]
        } catch (err) {
            await txn.rollback();
            throw new Error(`${err.message}`)
        }
        
    }
    async getMobileAndPickUpAddress(userId:string):Promise<{tel:string,fullAddress:string}>{
        const txn = await this.knex.transaction()
        try {
            let result = await txn.select(
                "users.mobile as tel",
                "customer_meta.full_address as fullAddress",
                "status").from("users")
            .join("customer_meta", "customer_meta.customer_id", "users.id")
            .where("users.id",userId)
            
            
            if(result.length === 0){
                throw new Error('Not exist this user')
            }
            if(result[0].status==="non_active"){
                throw new Error('Non active user')
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