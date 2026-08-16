

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true   

    },
    lastname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    emailid:{
        type:String,
        required:true
    },
    password:{  
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true  
    },
    height:{
        type:String
    }
});




module.exports=mongoose.model("user",userSchema);