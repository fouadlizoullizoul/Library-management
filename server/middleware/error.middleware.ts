import {Request,Response} from "express";
import Error from "../interface/error.interface";

const errorMiddleware =(
    error:Error,
    req:Request,
    res:Response,
)=>{
    const status =error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).json({status,message})
}
export default errorMiddleware