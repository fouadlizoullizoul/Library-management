import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config'
import routes from './routes'
const app=express();
app.use(express.json())

app.use('/api', routes)  // add routes to /api path
const PORT =config.port || 5000;

app.use(morgan('common'))
app.use(helmet());
app.use(rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    legacyHeaders: false, 
    standardHeaders:true,
    message: 'Too many requests, please try again after an hour.'  // default message
    
}))
//add routing for / path
app.get('/',(req,res)=>{
    res.json({message:"Hi Res"})
})

app.use(errorMiddleware)
app.use((_req, res)=>{
    res.status(404).json({message:"Page Not Found"})
})


app.listen(PORT,()=>{
    console.log("HI") 
});
export default app;