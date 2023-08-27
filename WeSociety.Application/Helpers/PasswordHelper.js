const bcrypt = require("bcrypt");
var crypto = require('crypto');


const generateHash = async (password) => {
    return await bcrypt.hash(password, 10);
}
const validatePassword = async (userPass,password) => {
    return await bcrypt.compare(password, userPass);
}

const generateHash2 = async (password) => {
    var bytes = Buffer(password || '', 'ucs2');
    var src = Buffer(salt || '', 'base64');
    var dst = Buffer(src.length + bytes.length);
    src.copy(dst, 0, 0, src.length);
    bytes.copy(dst, src.length, 0, bytes.length);
    
    return crypto.createHash('sha1').update(dst).digest('base64');
}


const validatePassword2 = async (hashedPassword,password) => {
    let splits = hashedPassword.split(':')
        let hashAlg = splits[0]
        let keyLength = parseInt(splits[1])
        let rounds = parseInt(splits[2])
        let salt = splits[3]
        let pbkdf2 = splits[4]

        let testPbkdf2 = crypto.pbkdf2Sync(
            password,
            salt,
            rounds,
            keyLength,
            hashAlg
        ).toString('hex')

        return testPbkdf2 === pbkdf2
}

module.exports = {generateHash,validatePassword,validatePassword2,generateHash2}