const mongoose = require('mongoose');

const todoSchema= mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
})

module.exports=mongoose.model("Todo",todoSchema);