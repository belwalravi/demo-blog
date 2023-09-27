const jwt = require("jsonwebtoken");
const User = require("../../Models/user")
const CustomError = require("../error/CustomError");
const {JWT_SECRET_KEY} =process.env ;

//iap
const isJWTTokenIncluded =(req) => {
    return (req.header("x-goog-iap-jwt-assertion"))
}

const getAccessTokenJWTFromHeader = (req) => {
    return req.header("x-goog-iap-jwt-assertion")
}

const verify = async(req)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {   
        console.log("--> verify_jwt_token")

        if(req.headers.authorization.split(" ")[1]=="null"){         
            return false
        }
        
        const authorization = req.headers.authorization
        const access_token = authorization.split(" ")[1]

        const decoded = jwt.verify(access_token,JWT_SECRET_KEY) ;
        const user = await User.findById(decoded.id)

        if(!user) {
            return next(new CustomError("You are not authorized to access this route ", 401))
        }
        return user;
    }
}

module.exports ={
    isJWTTokenIncluded,
    getAccessTokenJWTFromHeader,
    verify
}
