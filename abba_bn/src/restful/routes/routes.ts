import express from "express";
import { isLoggedInAPI } from "../../guard";
import { UserController } from "../controller/userController";
import { OrderController } from "../controller/orderController";
import { AdminController } from "../controller/adminController";
import { ThemeController } from "../controller/themeController";

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
        this.routes.get('/getPickUpAddressAndMobile',isLoggedInAPI,controller.getPickUpAddressAndMobile)
        this.routes.get('/getLanguageData/:require',controller.getLanguageDataGuest)
        // this.routes.put('/editUserPassword',isLoggedInAPI,controller.editUserPassword)
        this.routes.put('/editUserMobile',isLoggedInAPI,controller.editUserMobile)
        this.routes.put('/editUserAddress',isLoggedInAPI,controller.editUserAddress)
        this.routes.put('/delUser',isLoggedInAPI,controller.deleteUser)
        this.routes.get('/checkResetPasswordToken',isLoggedInAPI,controller.checkResetPasswordToken)

        this.routes.post('/forgetPassword',controller.forgetPassword)
        // this.routes.get('/oauth2callback',controller.authCodeCallback)
        this.routes.post('/resetPassword',isLoggedInAPI,controller.resetPassword)
        
    }
}
export interface IOrderController {
    addOrder(req:express.Request,res:express.Response):Promise<void>
}
export class OrderRoutes extends Routes{
    constructor(controller:OrderController){
        super()       
        this.routes.post('/addOrder',isLoggedInAPI,controller.addOrder)
        
        this.routes.get('/getUserAllOrder',isLoggedInAPI,controller.getUserAllOrder)
        this.routes.get('/userCurrentOrders', isLoggedInAPI, controller.getUserCurrentOrders)
        this.routes.get('/userOrderHistory', isLoggedInAPI, controller.getUserOrderHistory)

        this.routes.get('/getOrderPickUpAddressAndMobile/:id',isLoggedInAPI,controller.getPickUpAddressAndMobile)
    }
}
export interface IAdminController {
    allOrderData(req:express.Request,res:express.Response):Promise<void>
}
export class AdminRoutes extends Routes{
    constructor(controller:AdminController){
        super()       
        this.routes.get('/getUser/:userId',isLoggedInAPI,controller.getUser)
        this.routes.get('/allUserData',isLoggedInAPI,controller.allUserData)

        this.routes.get('/allOrderData',isLoggedInAPI,controller.allOrderData)
        this.routes.post('/addUser',isLoggedInAPI,controller.addUser)
        this.routes.post('/addOrder',isLoggedInAPI,controller.addOrder)
        this.routes.put('/editOrder/:id',isLoggedInAPI,controller.editOrder)
        this.routes.get('/getEditor/:editorType',isLoggedInAPI,controller.getEditor)
        this.routes.put('/editEditor/:editorType',isLoggedInAPI,controller.editEditor)
        this.routes.get('/getLanguageData/:require',controller.getLanguageData)

        this.routes.put('/editUser/:userId',isLoggedInAPI,controller.editUser)
        this.routes.get('/getOrderPickUpAddressAndMobile/:id',isLoggedInAPI,controller.getPickUpAddressAndMobile)
        this.routes.put('/editMessagongToken',isLoggedInAPI,controller.editMessagongToken)
    }
}

export interface IThemeController {
    getEditor(req:express.Request,res:express.Response):Promise<void>
    
}
export class ThemeRoutes extends Routes{
    constructor(controller:ThemeController){
        super()       
        this.routes.get('/getEditor/:editorType',controller.getEditor)
    }
}
