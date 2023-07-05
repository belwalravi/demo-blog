const { iapHandler } = require("../../Helpers/auth/iapHandler");
const User = require("../../Models/user");

const iapJwtHandler = async (req,res,next) =>{

    const token = req.header("X-Goog-IAP-JWT-Assertion") || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))

    if(!token){
        return next(new CustomError("Unauthorized access", 401))
    }
    else{
        const info = await iapHandler(token)
        if(!info.email)
        {
            return next(new CustomError("Unauthorized access, invalid token ", 401))
        }
        else{
            const user = await User.findOne({email : info.email})
            if(!user) { return next(new CustomError("You are not authorized to access this route ", 401))}
            else {
                req.user=user
                res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
                res.cookie()
                next()
            }
        }
    }
}

module.exports = {iapJwtHandler}