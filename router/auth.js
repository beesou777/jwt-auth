const express = require("express")
const router = express.Router()

const {Register,Login,userDetails} = require("../controller/auth")

router.route("/login").post(Login)
router.route("/register").post(Register)
router.route("/user_details/:uuid").get(userDetails)
module.exports = router