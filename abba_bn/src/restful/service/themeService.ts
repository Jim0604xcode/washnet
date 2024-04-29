import { Knex } from "knex"
import { knex } from "../../db"


class ThemeService{
    constructor(protected knex:Knex) {
     
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
    
}    

export let adminService = new ThemeService(knex)