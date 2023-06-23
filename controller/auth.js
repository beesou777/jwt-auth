const User = require("../modules/auth")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {v4: uuidv4} = require("uuid")

// generate access token
const accessToken = (userId)=>{
    return jwt.sign({sub : userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"1d"
    })
}

// generste refresh token
const refreshTOken = (userId)=>{
    return jwt.sign({sub:userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
}

// register user
const Register = async (req,res)=>{
    try {
        const {username,password,email,phone,name} = req.body;
        if(!username || !password || !email || !phone || name){
            res.status(400).json({msg:"All feild are required"})
        }

        const salt =await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        const exitingUser = await User.findOne({username})

        if(exitingUser){
            return res.status(400).json({msg:"user already exist"})
        }

        const uuid = uuidv4()
        const newUser = new User({
            uuid,
            username,
            password:hashPassword,
            email,
            name,
            phone
        })

        await newUser.save()
        res.status(200).json({msg:"Sucessfully created"})
    } catch (error) {
        console.log(error,"this is error")
        res.status(500).json({msg:"internal server error"})
    }
}

// login user

const Login = async (req,res)=>{
    try {
        const {username,password} = req.body;

    if(!username || !password){
        res.status(400).json({msg:"username and password are required"})
    }

    const user = await User.findOne({username})

    if(!user){
        res.status(400).json({msg:"Invalid username or password"})
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(400).json({msg:"Invalid username or password"})
    }

    const access = accessToken(user.uuid)
    const refresh = refreshTOken(user.uuid)
    const uuid = user.uuid
    res.status(200).json({
        access,
        refresh,
        uuid
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"internal server error"})
    }
}



// get user detail
const userDetails = async (req,res)=>{
   try {
    const {uuid} = req.params

    const user = await User.findOne({uuid})

    if(!user){
        res.status(400).json({msg:"user not found"})
    }

    const {username,email,phone,name} = user

    res.status(200).json({
        uuid:user.uuid,
        username,
        email,
        name,
        phone
    })
   } catch (error) {
    console.log(error)
    res.status(500).json({msg:"Internal server error"})
   }

}

module.exports = {
    Register,
    Login,
    userDetails
}