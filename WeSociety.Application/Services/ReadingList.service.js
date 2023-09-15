const context = require('../../WeSociety.Persistence/context/dbContext')
const readingListMapping = require('../mappings/readingList.mapping')

module.exports = {
    insert: async (data) => {
        await context.ReadingList.create(data)
    },

    getAllByUser : async (userProfileId) => {
        const lists = await context.ReadingList.findAll({
            include: ["Articles"],
            where:{
                UserProfileId: userProfileId
            }
        })

        const listDtos = lists.map(l => readingListMapping.GetReadingListDto(l))
        return listDtos;
    }
}