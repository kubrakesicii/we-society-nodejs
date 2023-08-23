const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK,SuccessResponse} = require('../Reponses/Response')

module.exports = {
    insert: async (req,res,next) => {
        const data = req.body;
        await context.ArticleClap.create(data)
        return new SuccessResponse(res)  
    },

    getAllByArticle: async (req,res,next) => {
        // const claps = await context.ArticleClap.findAll({
        //     attributes: ['UserProfile.Id', [models.sequelize.fn('count', models.sequelize.col('')), 'total_cost']],
        //     include: ["UserProfile"], 
        //     where : {
        //         ArticleId : req.query.articleId
        //     },
        //     group:"UserProfile.Id"
        // })


        const claps = context.ArticleClap.query(`SELECT [a].[Id], [a].[ArticleId], [a].[CreatedTime], [a].[IsActive], [a].[UpdatedTime], [a].[UserProfileId], [a0].[Id], [a0].[CategoryId], [a0].[Content], [a0].[CreatedTime], [a0].[Domain], [a0].[IsActive], [a0].[IsPublished], [a0].[MainImage], [a0].[Title], [a0].[UpdatedTime], [a0].[UserProfileId], [a0].[ViewCount], [u].[Id], [u].[Bio], [u].[CreatedTime], [u].[FullName], [u].[Github], [u].[Image], [u].[IsActive], [u].[Linkedin], [u].[UpdatedTime], [u].[UserId], [a1].[Id], [a1].[AccessFailedCount], [a1].[ConcurrencyStamp], [a1].[Email], [a1].[EmailConfirmed], [a1].[LockoutEnabled], [a1].[LockoutEnd], [a1].[NormalizedEmail], [a1].[NormalizedUserName], [a1].[PasswordHash], [a1].[PhoneNumber], [a1].[PhoneNumberConfirmed], [a1].[SecurityStamp], [a1].[TwoFactorEnabled], [a1].[UserName]
        FROM [ArticleClaps] AS [a]
        INNER JOIN [Articles] AS [a0] ON [a].[ArticleId] = [a0].[Id]
        INNER JOIN [UserProfiles] AS [u] ON [a].[UserProfileId] = [u].[Id]
        INNER JOIN [AspNetUsers] AS [a1] ON [u].[UserId] = [a1].[Id]
        WHERE [a].[ArticleId] = 28`)
        return new OK(res,claps)

    }
}