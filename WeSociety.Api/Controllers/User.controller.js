const UserService = require("../../WeSociety.Application/Services/User.service")

module.exports = {
    register: UserService.register,
    login: UserService.login
}