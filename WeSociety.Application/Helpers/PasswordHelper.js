const bcrypt = require("bcrypt");

const generateHash = async (password) => {
    return await bcrypt.hash(password, 10);
}
const validatePassword = async (userPass,password) => {
    return await bcrypt.compare(password, userPass);
}
module.exports = {generateHash,validatePassword}