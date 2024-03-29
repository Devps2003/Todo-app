const { JWT_SECRET } = require("./server/config");
const jwt = require('jsonwebtoken');


const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(411).json({
            message: "nope"
        })
    }
    const authToken = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(authToken,JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch{
        return res.status(411).json({
            message: "nope"
        })
    }

}