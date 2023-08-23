const GetReadingListDto = (readingList) => (
    {
        id: readingList.Id,
        name:readingList.Name,
        articleCount : readingList.Articles != null ? readingList.Articles.length : 0
    }
)


module.exports = {GetReadingListDto}