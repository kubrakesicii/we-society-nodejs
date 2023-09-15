const { SuccessResponse } = require("../../WeSociety.Application/reponses/response");
const readingListService = require("../../WeSociety.Application/services/readingList.service")

module.exports = {
    insert : async (req,res,next) => {
        await readingListService.insert(req.body);
        return new SuccessResponse(res)
    },
    getAllByUser : async (req,res,next) => {
        var data = readingListService.getAllByUser(req.require.userProfileId);
        return new OK(res,data)
    }
}