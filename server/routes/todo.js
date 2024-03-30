const express = require('express');
const User = require('../models/user')
const Todo = require('../models/todo')
const router = express.Router();


router.post("/addtask", async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        if (user) {
            const todo = new Todo({
                title: req.body.title,
                body: req.body.body,
                user: user._id // Saving only the user's ID in the todo
            });

            await todo.save(); // Saving the todo instance

            user.todos.push(todo);
            await user.save(); // Saving the user instance

            return res.status(200).json({
                message: "Todo added"
            });
        } else {
            return res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


router.put("/updateTask/:id", async (req, res) => {
    const { title, body } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, { title, body });
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        return res.status(200).json({
            message: "Todo updated"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const user = await User.findByIdAndUpdate(
            req.body.id,
            { $pull: { todos: taskId } },
            { new: true } // To return the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await Todo.findByIdAndDelete(taskId);
        
        return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/getTasks/:id", async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.params.id }).sort({ createdAt: -1 });
        
        if (todos.length !== 0) {
            return res.status(200).json({ todos: todos });
        } else {
            return res.status(404).json({ message: "No todos found for the user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports=router;