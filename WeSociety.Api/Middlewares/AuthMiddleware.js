const {verifyToken} = require('../../WeSociety.Infrastructure/Authentication/TokenService')
const {UnauthorizedError} = require("../../WeSociety.Application/Errors/ErrorResponse")

module.exports = (req, res,next) => {
    console.log("IN AUTH MİDD");
    try{
        const token = req.headers.authorization?.split(" ")[1] || "";
        console.log("Token : ", token);

        if(token != null) {
            req.token = verifyToken(token)
        } else {
            console.log("Token is null");
            return next(new UnauthorizedError())
        }
        next()
    } catch(error) {
        console.log("ERR : ", error);
        if (error.name == "TokenExpiredError") {
            //return next(new UnauthorizedError())
        }
        else {
            return next(new UnauthorizedError())
        }
    }
}