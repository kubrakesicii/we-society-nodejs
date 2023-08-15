const {verifyToken} = require('../../WeSociety.Infrastructure/Authentication/TokenService')

module.exports = (req, res,next) => {
    try{
        req.token = verifyToken(req)
        next()
    } catch(error) {
        if (error.name == "TokenExpiredError") {
            // return new CLIENT_ERROR_RESPONSES(res, 401, null, { validate: false, message: 'Token is expired. Please refresh token or log in again.' })
        }
        else {
            // return new CLIENT_ERROR_RESPONSES(res, 401, null, { validate: false, message: 'JWT is broken. Please check token in headers' })
        }
    }
}