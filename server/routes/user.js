const express = require('express');

const router = express.Router();
const {User} = require('../db');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../config');

const signupbody = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.password()
})

router.post("/signup", async(req,res)=>{
    const {success} = signupbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "invalid inputs"
        })
    }
    const existuser = await User.findOne(req.body.username);
    if(existuser){
        return res.status(411).json({
            message: "username already taken"
        })
    }
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    
})