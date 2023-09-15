const jwt = require('jsonwebtoken')

const createToken = (data) => {
    const payload = {
        id:data.id,
        fullName:data.fullName,
        userName:data.userName,
        userProfileId:data.userProfileId
    }
    const token = jwt.sign(payload, process.env.JWT_SECURITY_KEY, {expiresIn:'24h'})
    return token;
}

const verifyToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.JWT_SECURITY_KEY, {algorithms:['HS256']});
    return decodedToken;
}

module.exports = {
    createToken,
    verifyToken
}