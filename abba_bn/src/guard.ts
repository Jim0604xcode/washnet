import express from "express";
import { errorHandler } from "./error";
import { verifyJwt } from "./jwt";

export const isLoggedInAPI = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            res.locals.jwt = await verifyJwt(token);
            next()
        }else{
            throw new Error('Please provide jwt to verify')
        }
    } catch (err) {
        
        errorHandler(err,req,res)
    }
    
  };