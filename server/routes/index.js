const express = require('express');
const userRouter = require('./user');
const rootRouter = express.Router();

userRouter.use("/user",userRouter);

module.exports={
    rootRouter
}



