const asyncErrorWrapper = require("express-async-handler")
const { OAuth2Client } = require("google-auth-library");
const CustomError = require("../Helpers/error/CustomError");
const {isJWTTokenIncluded, getAccessTokenJWTFromHeader } = require("../Helpers/auth/jwtTokenHelper");
const User = require("../Models/user");
const { sendToken } = require("../Helpers/auth/tokenHelpers");


const performAuth = asyncErrorWrapper(async (req, res, next) => {
console.log("--> cheking for verify_iap_jwt (performAuth)")

if (!isJWTTokenIncluded(req)) { //checks if token included, returns token or thorws error
    console.log("iap token not present")
    return next(new CustomError("You are not authorized to access this route ", 401))
}

const iapAccessToken = getAccessTokenJWTFromHeader(req) //iap access token 
console.log("--> iapAccess token : ", iapAccessToken)

const expectedAudience = process.env.IAP_SIGNED_HEADER;
console.log("--> expectedAudience : ", expectedAudience)

const client = new OAuth2Client();
const response = await client.getIapPublicKeys(); //for pubic key
const decoded_iap_jwt = await client.verifySignedJwtWithCertsAsync( //verify IAP JWT
    iapAccessToken,
    response.pubkeys,
    expectedAudience, 
    ["https://cloud.google.com/iap"] //certs_url
);

var userEmail = decoded_iap_jwt.payload.gcip.email || req.body.email ;
console.log("--> userEmail", userEmail)
// req.header["jwt_token"] = iapJwt; //remove or replace store in cookies  

console.log("decoded_iap_jwt.payload.gcip.domains --> ", decoded_iap_jwt.payload["gcip"]["domains"]);

if (!decoded_iap_jwt.payload["gcip"]["domains"].includes(process.env.TENANT_DOMAIN)) {
    return next(new CustomError("You are not authorized to access this route ", 403))
}        

const user = await User.findOne({ "email": userEmail })
console.log(req.body)
if (!user) {
    return next(new CustomError("You are not authorized to access this route ", 401))
}

req.user = user
sendToken(user,200,req)

})
module.exports = { performAuth }