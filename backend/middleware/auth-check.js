const jwt = require("jsonwebtoken")
const HttpError = require("../models/httpError")

module.exports = (req, res, next) => {
    // Handling the browser default "OPTIONS" request
    if (req.method == 'OPTIONS') {
        return next();
    }
    // try catch block in case headers doesn't een have an authorization field
    try{
        // Encoding the token in headers
        const token = req.headers.authorization.split(' ')[1] // Authorization: "Bearer TOKEN" -- convention
        if (!token) {
            throw new Error("Authentication Failed!")
        }

        // Verifying Token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        // In further requests attach a userId from the token
        req.userData = { userId: decodedToken.userId }
        // Since there were no errors until this point, this means that the user is allowed to access the futher requests
        next();
    }catch(err){
        return next(new HttpError("Unauthorized Access! Please login/signup before continuing!", 401))
    }
   
} 