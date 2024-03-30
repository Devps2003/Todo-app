const express = require('express');
const zod = require('zod');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

const signupBody = zod.object({
    email: zod.string().email(),
    username: zod.string(),
    password: zod.string()
});
router.post("/signup",async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "wrong inputs"
        })
    }
    try{
        const hashpassword = bcrypt.hashSync(req.body.password);
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashpassword
        })
        await user.save();
        return res.status(200).json({
            message: "user created"
        })
    }catch(error){
        res.status(400).json({
            message: "user already exist"
        })
    }
})


router.post("/signin", async(req,res)=>{
    try{
        const user = await User.findOne({
            email: req.body.email
        })
        if(!user){
            return res.status(411).json({
                message: "user not found"
            })
        }
        const ispasscorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!ispasscorrect){
            return res.status(411).json({
                message: "wrong password"
            })
        }
        const {password, ...others}= user._doc;
        res.status(200).json({user: others});

    }catch(error){
        res.status(411).json({
            message: " internal server error"
        })
    }
})

module.exports=router;