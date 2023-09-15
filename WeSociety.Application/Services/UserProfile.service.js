const context = require('../../WeSociety.Persistence/context/dbContext')
const {NotfoundError} = require('../errors/errorResponse')
const userProfileMapping = require('../mappings/userProfile.mapping')

module.exports = {
    getById : async (id) => {
        const userProfile = await context.UserProfile.findOne({
            include:["Followers","Followings","User"],
            where: {Id:id}
        })

        const getDto = userProfileMapping.GetUserProfileDto(userProfile)
        return getDto;
    },

    update : async (id,data) => {
        const affectedRows = await context.UserProfile.update(data, {
            where: {
                Id:id
            }
        })
        
        if(affectedRows == 0) throw new NotfoundError()

        //return
        const updUserProfile = await context.UserProfile.findOne({include:"User", where:{Id:req.params.id}})
        const updDto = userProfileMapping.GetUpdateUserDto(updUserProfile)
        return updDto;
    }
}
