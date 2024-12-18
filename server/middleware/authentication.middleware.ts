import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Error from "../interface/error.interface";
import config from "../config";

 

const handleUnauthorizedError = (next: NextFunction)=>{
    const error: Error = new Error('Login Error:Please try again');
    error.status = 401;
    next(error);
}
const validateTokenMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        //get authHeader
        const authHeader =req.get('Authorization');
        if(authHeader){
            const beare = authHeader.split(' ')[0].toLowerCase();
            const token =authHeader.split(' ')[1];
            if(token && beare){
                const decode =jwt.verify(token, config.tokenSecret as unknown as string)
                if(decode){
                    next()
                }else{
                    handleUnauthorizedError(next)
                }
            }else{
                //no token provided
                handleUnauthorizedError(next);
            }
        }else{
            //no token provider
            handleUnauthorizedError(next);
        }
    } catch{
        handleUnauthorizedError(next);
    }
}
export default validateTokenMiddleware