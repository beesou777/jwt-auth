// imports
const express = require("express")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const connectdb = require("./db/connect")
const cors = require("cors")
const auth = require("./router/auth")
const app = express()
app.use(cors())
dotenv.config()

app.use('/api/admin',auth)

let PORT = process.env.PORT || 3000

app.listen(PORT,async()=>{
    try {
        await connectdb(process.env.MONGODB_URL)
        console.log(`listening on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})