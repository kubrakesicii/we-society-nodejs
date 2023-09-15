const context = require('../../WeSociety.Persistence/context/dbContext')
const {UserExistsError, LoginError} = require('../errors/errorResponse')
const userMapping = require('../mappings/user.mapping');
const uuid = require('uuid');
const {createToken} = require('../../WeSociety.Infrastructure/authentication/tokenService')
const {generateHash,validatePassword} = require("../helpers/passwordHelper")

module.exports = {
    register : async (data) => {
        const exists = await context.AspNetUser.findOne({
            where:{
                Email:data.Email
            }
        })

        if(exists != null) throw new UserExistsError()
        const newData = {...data,Id: uuid.v4(),
                    PasswordHash:await generateHash(data.Password)
                };
        
        const newUser = await context.AspNetUser.create(newData)

        //create empty userProfile fot this user
        await context.UserProfile.create({UserId:newUser.Id})
        
        const dto = userMapping.GetUserDto(newUser)
        return dto;
    },


    login : async (data) => {
        const user = await context.AspNetUser.findOne({
            where:{
                Email:req.body.Email
            }
        })

        if(user == null) throw new LoginError()

        const verify = await validatePassword(user.PasswordHash,data.Password)
        if(!verify) throw new LoginError()

        const userProfile = await context.UserProfile.findOne({include:"User", where:{UserId:user.Id}})
        const token = createToken(user.Id, user.Email, user.UserName, userProfile.Id)
        const dto = userMapping.GetLoginUserDto(userProfile,token)
        return dto;
    }
}