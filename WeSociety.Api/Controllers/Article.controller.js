const { SuccessResponse, OK } = require("../../WeSociety.Application/reponses/response");
const articleService = require("../../WeSociety.Application/services/article.service")


module.exports = {
    insert: async (req, res, next) => {
        const data = req.body;
        const insArticle = {
          ...data,
          MainImage: req.files != null ? req.files.mainImage.data : null,
          Domain: data.title.toLowerCase().replace(" ", "-"),
        };
    
        await articleService.insert(insArticle);
        return new SuccessResponse(res);
    },
    update: async (req,res,next) => {
        try {
            const data = req.body;
            let updArticle;
            if (req.files == null) {
              const { mainImage, MainImage, ...rest } = data;
              updArticle = rest;
            } else {
              updArticle = {
                ...data,
                MainImage: req.files != null ? req.files.mainImage.data : null,
              };
            }

            await articleService.update(req.params.id,updArticle)
        }
        catch(err) {
            next(err)
        }
    },
    getById: async (req,res,next) => {
        try{
            var data = await articleService.getById(req.params.id)
            return new OK(res,data)
        }
        catch(err){
            next(err)
        }
    },
    getAll: async (req,res,next) => {
        console.log("LIM : ",req.query.pageSize);
        console.log("OFF : ",req.query.pageIndex);

        var data = await articleService.getAll(req.query.pageIndex, req.query.pageSize, req.query.categoryId)
        return new OK(res,data)
    },
    getAllDrafts: async (req,res,next) => {
        var data = await articleService.getAllDrafts(req.query.pageIndex, req.query.pageSize, req.query.userProfileId)
        return new OK(res,data)
    },
    getAllPopulars: async (req,res,next) => {
        var data = await articleService.getAllPopulars(req.query.categoryId)
        return new OK(res,data)
    },
    getAllByUser: async (req,res,next) => {
        var data = await articleService.getAllByUser(req.query.pageIndex, req.query.pageSize, req.query.userProfileId)
        return new OK(res,data)
    }
}