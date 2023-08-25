const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK,SuccessResponse} = require('../Reponses/Response')
const readingListMapping = require('../Mappings/ReadingList.mapping')

module.exports = {
    insert: async (req,res,next) => {
        const data = req.body;
        await context.ReadingList.create(data)
        return new SuccessResponse(res)
    },

    getAllByUser : async (req,res,next) => {
        const lists = await context.ReadingList.findAll({
            include: ["Articles"],
            where:{
                UserProfileId: req.query.userProfileId
            }
        })

        const listDtos = lists.map(l => readingListMapping.GetReadingListDto(l))
        return new OK(res, listDtos)
    }
}