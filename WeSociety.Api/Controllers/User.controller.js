const userService = require("../../WeSociety.Application/services/user.service")

module.exports = {
    register: async (req,res,next) => {
        try {
            var data = await userService.register(req.body)
            return new OK(res,data)
        }
        catch(err) {
            next(err)
        }
    },
    login: async (req,res,next) => {
        try {
            var data = await userService.login(req.body)
            return new OK(res,data)
        }
        catch(err) {
            next(err)
        }
    },
}