const {verifyToken} = require('../../WeSociety.Infrastructure/Authentication/TokenService')
const {UnauthorizedError,TokenExpiredError} = require("../../WeSociety.Application/Errors/ErrorResponse")
const jwt = require('jsonwebtoken')


module.exports = async (req, res,next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1] || "";

        ///verify token        
        if(token != null) {
            req.token = verifyToken(token)
            // const decodedToken = await jwt.verify(token,process.env.JWT_SECURITY_KEY,{algorithms:['HS256']});
        } else {
            return next(new UnauthorizedError())
        }
        next()
    } catch(error) {
        if (error.name == "TokenExpiredError") {
            return next(new TokenExpiredError())
        }
        else {
            return next(new UnauthorizedError())
        }
    }
}