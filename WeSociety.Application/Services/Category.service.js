const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK} = require('../Reponses/Response')
const {NotfoundError, UnauthorizedError} = require('../Errors/ErrorResponse')

module.exports = {
    getAll : async (req, res,next) => {
        const categories = await context.Categories.findAll()
        console.log("RES : ", categories);
        return new OK(res,categories)
    },

    getById : async (req, res,next) => {
        const category = await context.Categories.findOne({
            where: {
                Id:req.params.id
            }
        })
        if(category === null) return next(new NotfoundError(res))
        return new OK(res,category)
    },

    insert : async (req,res,next) => {
        const data = req.body;
        const newCategory = await context.Categories.create(data)
        return new OK(res,newCategory)

    },

    update : async (req,res,next) => {
        // Güncellenmek istenen şarta uyan row yoksa hata dönmez, affectedRows = 0 gelir
        const data = req.body;
        const affectedRows = await context.Categories.update(data, {
            where: {
                Id:req.params.id
            }
        })

        if(affectedRows == 0) return next(new NotfoundError(res))
        return new OK(res,affectedRows)
    },

    delete : async (req,res,next) => {
        // Silinmek istenen şarta uyan row yoksa hata dönmez, affectedRows = 0 gelir
        const affectedRows = await context.Categories.destroy({
            where: {
                Id:req.params.id
            }
        })

        if(affectedRows == 0) return next(new NotfoundError(res))
        return new OK(res,affectedRows)
    }
};
