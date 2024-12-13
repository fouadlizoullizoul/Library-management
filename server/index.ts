import express from 'express'
const app=express();
const PORT =5000;

//add routing for / path
app.get('/',(req,res)=>{
    res.json({message:"Hi Res"})
})


app.listen(PORT,()=>{
    console.log("HI")
});
export default app;