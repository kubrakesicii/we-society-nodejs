const ReadingListService = require("../../WeSociety.Application/Services/ReadingList.service")

module.exports = {
    insert : ReadingListService.insert,
    getAllByUser : ReadingListService.getAllByUser
}