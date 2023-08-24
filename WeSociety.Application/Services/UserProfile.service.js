const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK} = require('../Reponses/Response')
const {UserExistsError, LoginError, NotfoundError} = require('../Errors/ErrorResponse')
const userProfileMapping = require('../Mappings/UserProfile.mapping')
const {ConvertFileToByteArray} = require("../Helpers/FileHelper")

module.exports = {
    getById : async (req,res,next) => {
        const userProfile = await context.UserProfile.findOne({
            include:["Followers","Followings","User"],
            where: {Id:req.params.id}
        })

        const getDto = userProfileMapping.GetUserProfileDto(userProfile)
        return new OK(res,getDto)
    },

    update : async (req,res,next) => {
        const data = req.body;
        let updData;
        if(req.files == null) {
            const {image, Image, ...rest} = data;
            updData = rest;
        }
        else {
            updData = {...data, Image:req.files != null ? req.files.image.data : null}
        }

        const affectedRows = await context.UserProfile.update(updData, {
            where: {
                Id:req.params.id
            }
        })
        
        if(affectedRows == 0) return next(new NotfoundError(res))

        //return
        const updUserProfile = await context.UserProfile.findOne({include:"User", where:{Id:req.params.id}})
        const updDto = userProfileMapping.GetUpdateUserDto(updUserProfile)
        return new OK(res,updDto)
    }
}
