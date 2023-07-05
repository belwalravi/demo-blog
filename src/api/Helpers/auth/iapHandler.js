const { default: axios } = require('axios');
const jwt = require('jsonwebtoken')

//need information on audiance
async function iapHandler(jwtAssertion) {
    try {
        //check if jwt present
        if (!jwtAssertion) {
            return {};
        }
        // Decode the header to determine which certificate signed the assertion
        const encodedHeader = jwtAssertion.split(".")[0];
        const decodedHeader = Buffer.from(encodedHeader, "base64").toString("utf8");
        const header = JSON.parse(decodedHeader);
        const keyId = header.kid;

        // Fetch the current certificates and verify the signature on the assertion
        let response = await axios.get("https://www.gstatic.com/iap/verify/public_key");
        let certs = JSON.parse(response.body);

        const payload = jwt.verify(jwtAssertion, certs[keyId])

        if(!payload.email){
            return {}
        }

        // Return the two relevant pieces of information
        localStorage.setItem("iapToken", jwtAssertion)
        
        return {
            token: payload,
            email: payload.email,
            // sub: payload.sub,
        };
    }
    catch (error) {
        console.log(error)
        return {}
    }
}

module.exports = { iapHandler };
