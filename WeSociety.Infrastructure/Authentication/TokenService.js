const jwt = require('jsonwebtoken')

const createToken = (data) => {
    //token içeriği olustur
    const payload = {
        id:data.id,
        fullName:data.fullName,
        userName:data.userName,
        userProfileId:data.userProfileId
    }

    const token = jwt.sign(payload, process.env.JWT_SECURITY_KEY, {expiresIn:7})
    return token;
}

const verifyToken =(req) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECURITY_KEY);
    return decodedToken;
}

module.exports = {
    createToken,
    verifyToken
}