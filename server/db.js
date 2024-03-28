const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/todo");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
})
const todoSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    
})

const User = mongoose.model('User',userSchema);
const Todo = mongoose.model('Todo',todoSchema);

module.exports={
    User,Todo
}