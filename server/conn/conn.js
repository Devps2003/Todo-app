const mongoose = require('mongoose');

const conn = async (req,res)=>{
    try{
        await mongoose.connect(
            "mongodb://localhost:27017"
        )
        .then(()=>{
            console.log("connected");
        });
    }catch(error){
        console.log(error);
    }
};

conn();