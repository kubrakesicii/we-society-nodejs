const { OK } = require('../../WeSociety.Application/reponses/response');
const userProfileService = require('../../WeSociety.Application/services/userProfile.service')

module.exports = {
    getById: async (req,res,next) => {
        var data = await userProfileService.getById(req,params,id)
        return new OK(res,data)
    },
    update: async (req,res,next) => {
        try {
            const data = req.body;
            let updData;
            if(req.files == null) {
                const {image, Image, ...rest} = data;
                updData = rest;
            }
            else {
                updData = {...data, Image:req.files != null ? req.files.image.data : null}
            }
            var upRes = await userProfileService.update(updData)
            return new OK(res, upRes)
        }
        catch(err) {
            next(err)
        }
    }
}