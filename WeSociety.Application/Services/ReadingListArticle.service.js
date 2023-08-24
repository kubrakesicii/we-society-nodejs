const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK, SuccessResponse} = require('../Reponses/Response')
const articleMapping = require('../Mappings/Article.mapping')
const userProfileMapping = require('../Mappings/UserProfile.mapping')
const categoryMapping = require('../Mappings/Category.mapping');
const { Op } = require("sequelize");

module.exports = {
    insert : async (req,res,next) => {
        const data = req.body;
        await context.ReadingListArticle.create(data)
        return new SuccessResponse(res)
    },

    getArticlesByList : async (req,res,next) => {
        const readingListArticles = await context.ReadingListArticle.findAll({
            include:[
                { association: 'Article', include:['Category',
                    {
                    association: 'UserProfile' , include:['User']
                }]}],
            where: {
                ReadingListId : req.query.readingListId
            },
            distinct:true
        })

        const articleDtos = []
        readingListArticles.map(readList => {
            const aDto = articleMapping.GetArticleDto(readList.Article)
            aDto.userProfile = userProfileMapping.GetUserProfileDto(readList.Article.UserProfile)
            aDto.category = categoryMapping.GetCategoryDto(readList.Article.Category)
            articleDtos.push(aDto)
        })
        return new OK(res,articleDtos)

    },

    getIsSaved : async (req,res,next) => {
        // const readingListArticle = await context.ReadingListArticle.findOne({

        //     include: [{
        //         as :'Article',
        //         where: {UserProfileId : req.query.userProfileId}
        //     }]
        // })
        return new OK(res, {id:0,isSaved:false})
    },

    removeSaved : async (req,res,next) => {
        const affectedRows = await context.ReadingListArticle.destroy({
            where: {
                Id:req.params.id
            }
        })

        if(affectedRows == 0) return next(new NotfoundError(res))
        return new SuccessResponse(res)
    }
}