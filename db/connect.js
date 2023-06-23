const mongoose = require("mongoose")

const connectdb = (uri) =>{
    console.log('CONNECTED TO MONGODB SUCCESSTULLY')
    return mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

module.exports = connectdb