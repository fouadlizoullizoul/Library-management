const express = require('express');
const router =express.Router();
const pool =require('../db/db');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

//register
router.post('/register',async(req,res)=>{
    const {email,password,username}=req.body;
    console.log("Password , name , email",password,username,email);
    console.log("Password type",typeof password)
    try {
        //we have to check if the user existe
        const existingUser =await pool.query("SELECT * FROM users WHERE email =$1",[email]);
        if(existingUser.rows.length > 0){
            return res.status(400).json({msg: 'User already exists '});
        }
        //hash the password
        const hashedPassword =await bcrypt.hash(password,10)
        //add user to database
        const newUser=await pool.query(
            "INSERT INTO users (username,email,password) VALUES ($1, $2, $3) RETURNING *",
            [username,email,hashedPassword]
        )
        res.status(200).json({message:"User registered successfully",user:newUser.rows[0]})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
})
//Login
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        //checking if user existe
        const user =await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        if(user.rows.length === 0){
            return res.status(400).json({msg: 'Invalide email or password'});
        }
        //check password
        const isMatch =await bcrypt.compare(password,user.rows[0].password);
        if(!isMatch){
            return res.status(400).json({msg: 'Invalide email or password'});
        }
        //create token
        const token =jwt.sign({id:user.rows[0].id,role:user.rows[0].role},process.env.JWT_SECRET,{
            expiresIn:"1h",
        })
        res.status(200).json({message:"Logged in successfully",token})
    }catch{
        console.log(error)
        res.status(500).json({error:error.message})
    }
})
module.exports = router