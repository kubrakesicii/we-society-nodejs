const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const createToken = (data) => {
    //token içeriği olustur
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
    var secret = Buffer.from(process.env.JWT_SECURITY_KEY, 'base64')
    //var tokenBuffer = Buffer.from(token, 'base64')
    var signBuffer = Buffer.from(token.split('.')[2], 'base64')

    // console.log("ENV KEY : ", process.env.JWT_SECURITY_KEY);
    // const decodedToken = jwt.verify(token, secret, {algorithms:['HS256']});

    // console.log("DECODED : ", decodedToken);

    // console.log("Secret : ", secret);

    console.log("TYPE : ", typeof(signBuffer));
    console.log("SİGN : ", signBuffer);
    const res = crypto.verify('SHA256', token,process.env.JWT_SECURITY_KEY, signBuffer)

    console.log("RES : ", res);

    return decodedToken;
}

module.exports = {
    createToken,
    verifyToken
}