const express = require('epress');
const User = require('../models/user')
const Todo = require('../models/todo')
const router = express.Router();


router.post("/addtask", async(req,res)=>{
    try{
        const user = await User.findOne(req.body.id);
        if(user){
            const todo = new Todo({
                title: req.body.title,
                body : req.body.body,
                user: user
            })
            await Todo.save();
            res.status(200).json({
                message: "todo added"
            })
            user.todos.push(todo);
            user.save();
        }
    }catch(error){
        res.status(411).json({
            message: "error"
        })
    }
})

router.put("/updatetask/:id", async (req,res)=>{
    const {title, body} = req.body;
    try{
        const todo = await Todo.findbyIdAndUpdate(req.params.id, {title, body} );
        todo.save();
        res.status(200).json({
            message: " updated"
        })
    }catch(error){
        res.json({
            message: "error"
        })
    }
})


router.delete("/deleteTask/:id",async(req,res)=>{
    try{
        const {id}= req.body;
        const user = await User.findByIdAndUpdate(id, {
            $pull: {todo : req.params.id}
        });
        if(user){
            await Todo.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "task deleted"
            });
        }
    }catch(error){
        res.status(411);
    }
})

router.get("/getTasks/:id",async (req,res)=>{
    try{
        const todo = await Todo.find({user: req.params.id}).sort({
            createdAt: -1
        });
        if(todo.length !== 0){
            res.status(200).json({todo : todo});
        }
    }catch(error){
        res.status(411);
    }
})


module.exports=router;