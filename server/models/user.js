const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
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
    },
    todos: [{
        type: mongoose.Types.ObjectId,
        ref: "Todo"
    }]
})

const user=mongoose.model('User',userSchema);
module.exports=user;