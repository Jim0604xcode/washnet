import { errorHandler } from "../../error";
import { IThemeController } from "../routes/routes";
import {Request,Response} from 'express'
import { adminService } from "../service/adminService";

export class ThemeController implements IThemeController{

 
    async getEditor(req:Request,res:Response){
        try {
            
            let editorType = req.params.editorType
            const data = await adminService.getEditor(editorType)    
            
            res.json({
                data:data,
                isErr:false,
                errMess:null
            })
        }catch(err){
            errorHandler(err,req,res)
        }
    }
   

}
