const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK} = require('../Reponses/Response')
const {UserExistsError, LoginError} = require('../Errors/ErrorResponse')
const userMapping = require('../Mappings/User.mapping');
const uuid = require('uuid');
const {createToken} = require('../../WeSociety.Infrastructure/Authentication/TokenService')
const {generateHash,validatePassword} = require("../Helpers/PasswordHelper")

module.exports = {
    register : async (req, res, next) => {
        const data = req.body;
        const exists = await context.AspNetUser.findOne({
            where:{
                Email:data.Email
            }
        })

        if(exists != null) return next(new UserExistsError(res))
        const newData = {...data,Id: uuid.v4(),
                    PasswordHash:await generateHash(data.Password)
                };
        
        const newUser = await context.AspNetUser.create(newData)

        //create empty userProfile fot this user
        await context.UserProfile.create({UserId:newUser.Id})
        
        const dto = userMapping.GetUserDto(newUser)
        return new OK(res, dto)
    },


    login : async (req,res,next) => {
        const data = req.body;
        const user = await context.AspNetUser.findOne({
            where:{
                Email:req.body.Email
            }
        })

        if(user == null) return next(new LoginError(res))

        const verify = await validatePassword(user.PasswordHash,data.Password)
        if(!verify)  return next(new LoginError(res))

        const userProfile = await context.UserProfile.findOne({include:"User", where:{UserId:user.Id}})
        const token = createToken(user.Id, user.Email, user.UserName, userProfile.Id)
        const dto = userMapping.GetLoginUserDto(userProfile,token)
        return new OK(res,dto)
    }
}