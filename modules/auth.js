const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("auth",user)
