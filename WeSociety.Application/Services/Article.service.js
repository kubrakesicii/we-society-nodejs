const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK,SuccessResponse} = require('../Reponses/Response')
const userProfileMapping = require('../Mappings/UserProfile.mapping')
const articleMapping = require('../Mappings/Article.mapping')
const categoryMapping = require('../Mappings/Category.mapping');

module.exports = {
    insert : async (req, res,next) => {
        const data = req.body;
        const insArticle = {...data, MainImage: req.files != null ? req.files.mainImage.data : null,
            Domain: data.title.toLowerCase().replace(" ","-")}

        console.log("NEW ART : ",insArticle);

        await context.Article.create(insArticle);
        return new SuccessResponse(res)   
    },


    getById : async (req,res,next) => {
        const article = await context.Article.findOne({
            include:[
                { association: 'UserProfile', include:["User"]},
                "Comments","Claps","Category"],
            where: {Id:req.params.id}
        })

        const articleDto = articleMapping.GetArticleDto(article)
        articleDto.userProfile = userProfileMapping.GetUserProfileDto(article.UserProfile)
        articleDto.category = categoryMapping.GetCategoryDto(article.Category)
        return new OK(res, articleDto)
    },

    getAll : async (req,res,next) => {
        let whereCond = {IsPublished:1}
        if(req.query.categoryId != null && req.query.categoryId != 0) {
            whereCond = {...whereCond,CategoryId:req.query.categoryId}
        }
        // if(req.query.searchKey != "" && req.query.searchKey != null) {
        //     whereCond = {...whereCond, Title: sequelize.where(sequelize.fn('LOWER', sequelize.col('Title')), 'LIKE', '%'+req.query.searchKey+'%')}
        // }

        console.log("COND : ", whereCond);
        console.log("PAGEIND : ",req.query.pageIndex);
        console.log("PAGESIZE : ",req.query.pageSize);

        const articles = await context.Article.findAndCountAll({
            where: whereCond,
            include:[
                { association: 'UserProfile', include:["User"]},
                "Comments","Claps","Category"],
            order : [
                ["CreatedTime","DESC"]
            ],
            limit:req.query.pageSize == null ? 10 : parseInt(req.query.pageSize),
            offset: req.query.pageIndex == null ? 0 : parseInt(req.query.pageIndex),
            distinct:true
        })

        const articleDtos = []
        articles.rows.map(a => {
            const articleDto = articleMapping.GetArticleDto(a)
            articleDto.userProfile = userProfileMapping.GetUserProfileDto(a.UserProfile)
            // articleDto.userProfile = userProfileMapping.GetUserProfileDto(a.UserProfile)
            articleDto.category = categoryMapping.GetCategoryDto(a.Category)
            articleDtos.push(articleDto)
        })

        return new OK(res, {count:articles.count, items:articleDtos})
    },

    getAllDrafts: async (req,res,next) => {
        const articles = await context.Article.findAndCountAll({
            where: {UserProfileId: req.query.userProfileId},
            order : [
                ["CreatedTime","DESC"]
            ],
            include:[
                { association: 'UserProfile', include:["User"]},
                "Comments","Claps","Category"],
            limit:req.query.pageSize == null ? 10 : parseInt(req.query.pageSize),
            offset: req.query.pageIndex == null ? 0 : parseInt(req.query.pageIndex),
            distinct:true
        })

        const articleDtos = []
        articles.rows.map(a => {
            const articleDto = articleMapping.GetArticleDto(a)
            articleDto.userProfile = userProfileMapping.GetUserProfileDto(a.UserProfile)
            articleDto.category = categoryMapping.GetCategoryDto(a.Category)
            articleDtos.push(articleDto)
        })

        return new OK(res, {count:articles.count, items:articleDtos})
    },
    
    getAllPopulars: async (req,res,next) => {
        console.log("HERE: ",req.query.categoryId);

        let catCond = {IsPublished:1}
        if(req.query.categoryId != null && req.query.categoryId != 0) {
            catCond = {...catCond,CategoryId:req.query.categoryId}
        }
        const articles = await context.Article.findAll({
            // where: catCond,
            include:[
                { association: 'UserProfile', include:["User"]},
                "Comments","Claps","Category"],
            order: [
                ['viewCount' , 'DESC']
            ],
            limit:5,
            offset:0,
        })

        const articleDtos = []
        articles.map(a => {
            const articleDto = articleMapping.GetArticleDto(a)
            articleDto.userProfile = userProfileMapping.GetUserProfileDto(a.UserProfile)
            articleDto.category = categoryMapping.GetCategoryDto(a.Category)
            articleDtos.push(articleDto)
        })

        return new OK(res, articleDtos)
    },

    getAllDrafts: async (req,res,next) => {
        const articles = await context.Article.findAndCountAll({
            where: {UserProfileId: req.query.userProfileId, IsPublished:-1},
            order : [
                ["CreatedTime","DESC"]
            ],
            include:[
                { association: 'UserProfile', include:["User"]},
                "Comments","Claps","Category"],
            limit:req.query.pageSize == null ? 10 : parseInt(req.query.pageSize),
            offset: req.query.pageIndex == null ? 0 : parseInt(req.query.pageIndex),
            distinct:true
        })

        const articleDtos = []
        articles.rows.map(a => {
            const articleDto = articleMapping.GetArticleDto(a)
            articleDto.userProfile = userProfileMapping.GetUserProfileDto(a.UserProfile)
            articleDto.category = categoryMapping.GetCategoryDto(a.Category)
            articleDtos.push(articleDto)
        })

        return new OK(res, {count:articles.count, items:articleDtos})
    },

    getAllByUser: async (req,res,next) => {
        const articles = await context.Article.findAndCountAll({
            where: {UserProfileId: req.query.userProfileId, IsPublished:1},
            order : [
                ["CreatedTime","DESC"]
            ],
            include:[
                { association: 'UserProfile', include:["User"]},
                "Comments","Claps","Category"],
            limit:req.query.pageSize == null ? 10 : parseInt(req.query.pageSize),
            // offset: req.query.pageIndex == null ? 0 : parseInt(req.query.pageIndex),
            offset: 0,
            distinct:true
        })

        const articleDtos = []
        articles.rows.map(a => {
            const articleDto = articleMapping.GetArticleDto(a)
            articleDto.userProfile = userProfileMapping.GetUserProfileDto(a.UserProfile)
            articleDto.category = categoryMapping.GetCategoryDto(a.Category)
            articleDtos.push(articleDto)
        })

        return new OK(res, {count:articles.count, items:articleDtos})
    },

    update : async (req, res,next) => {
        const data = req.body;
        let updArticle;
        if(req.files == null) {
            const {mainImage, MainImage, ...rest} = data;
            updArticle = rest;
        }
        else {
            updArticle = {...data, MainImage: req.files != null ? req.files.mainImage.data : null}
        }      

        const affectedRows = await context.Article.update(updArticle, {
            where: {
                Id:req.params.id
            }
        });
        if(affectedRows == 0) return next(new NotfoundError(res))
        return new SuccessResponse(res)   
    }
    
}
