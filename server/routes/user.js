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
        password: req.body.password,
        todos: []
    })
    const newUserID= newUser._id;
    const newTodo = new Todo({
        userId: newUserID,
        title: "My first Todo!",
        description: "I will mark this todo done!",
        completed: false
    })
    await newTodo.save();
    newUser.todos.push(newTodo._id);
    await newUser.save();
    const token = jwt.sign({newUserID},jwt_secret.JWT_SECRET);
    return res.status(201).json({ message: 'User created successfully' });

})

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})
router.post("/signin",async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "wrong inputs"
        })
    }
    const theUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(theUser){
        const token = jwt.sign({userId:theUser._id},jwt_secret.JWT_SECRET);
        return res.status(200).json({
            message: "login successful"
        })
    }
    return res.status(411).json({
        message: "user not found"
    })
})


router.post()
