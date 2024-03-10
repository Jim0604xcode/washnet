import express from "express";
import { isLoggedInAPI } from "../../guard";
import { UserController } from "../controller/userController";
import { OrderController } from "../controller/orderController";
import { AdminController } from "../controller/adminController";

class Routes {
    routes:express.Router = express.Router()
}
export interface IUserController {
    login(req:express.Request,res:express.Response):Promise<void>
    register(req:express.Request,res:express.Response):Promise<void>
    getCurrentUser(req:express.Request,res:express.Response):Promise<void>
}
export class UserRoutes extends Routes{
    constructor(controller:UserController){
        super()       
        this.routes.post('/login',controller.login)
        this.routes.post('/register',controller.register)
        this.routes.get('/getCurrentUser',isLoggedInAPI,controller.getCurrentUser)
        this.routes.get('/getUserPickUpAddress',isLoggedInAPI,controller.getPickUpAddress)
        // this.routes.get('/getLanguageDataAuth/:require',isLoggedInAPI,controller.getLanguageDataAuth)
        this.routes.get('/getLanguageData/:require',controller.getLanguageDataGuest)
        
    }
}
export interface IOrderController {
    addOrder(req:express.Request,res:express.Response):Promise<void>
}
export class OrderRoutes extends Routes{
    constructor(controller:OrderController){
        super()       
        this.routes.post('/addOrder',isLoggedInAPI,controller.addOrder)
        this.routes.get('/getOrderItems/:id',isLoggedInAPI,controller.getOrderItems)
        this.routes.get('/getUserAllOrder',isLoggedInAPI,controller.getUserAllOrder)
        this.routes.get('/getDeliveryWaitPickup',isLoggedInAPI,controller.getDeliveryWaitPickup)
        this.routes.get('/getOrderPickUpAddress/:id',isLoggedInAPI,controller.getOrderPickUpAddress)
    }
}
export interface IAdminController {
    allOrderData(req:express.Request,res:express.Response):Promise<void>
}
export class AdminRoutes extends Routes{
    constructor(controller:AdminController){
        super()       
        this.routes.get('/allOrderData',isLoggedInAPI,controller.allOrderData)

        this.routes.post('/addOrder',isLoggedInAPI,controller.addOrder)
        this.routes.put('/editOrder/:id',isLoggedInAPI,controller.editOrder)

        this.routes.get('/allUserData',isLoggedInAPI,controller.allUserData)
        this.routes.get('/getUser/:userId',isLoggedInAPI,controller.getUser)
    }
}