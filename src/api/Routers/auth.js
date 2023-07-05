const express = require("express")

const {register,login,forgotpassword,resetpassword,getPrivateData} = require("../Controllers/auth");

// const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const { iapJwtHandler } = require("../Middlewares/Authorization");


const router = express.Router() ;


router.post("/register",register)

router.post("/login",login)

router.post("/forgotpassword",forgotpassword)

router.put("/resetpassword",resetpassword)

router.get("/private", iapJwtHandler,getPrivateData)


module.exports = router