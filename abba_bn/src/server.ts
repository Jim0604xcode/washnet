import express from "express";
import { env_config } from './env';
import { createServer } from "http";
import cors from "cors"
import { UserController } from "./restful/controller/userController";
import { AdminRoutes, OrderRoutes, UserRoutes } from "./restful/routes/routes";
import { OrderController } from "./restful/controller/orderController";
import { AdminController } from "./restful/controller/adminController";

const app = express();
app.use(cors({
  origin:"http://localhost:8100"
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const httpServer = createServer(app);


const userController = new UserController()
const userRoute = new UserRoutes(userController)
app.use('/user',userRoute.routes)
const orderController = new OrderController()
const orderRoute = new OrderRoutes(orderController)
app.use('/order',orderRoute.routes)
const adminController = new AdminController()
const adminRoute = new AdminRoutes(adminController)
app.use('/admin',adminRoute.routes)

httpServer.listen(env_config.PORT, () => {
    console.log(`Listening at http://localhost:${env_config.PORT}/`);
});
  