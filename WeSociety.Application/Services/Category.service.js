const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK} = require('../Reponses/Response')
const {NotfoundError, UnauthorizedError} = require('../Errors/ErrorResponse')
const categoryMapping = require('../Mappings/Category.mapping');

module.exports = {
    getAll : async (req, res,next) => {
        const categories = await context.Category.findAll()
        // var dtos = categories.map(c => categoryMapping.GetCategoryDto(c))
        return new OK(res,categories)
    },

    getById : async (req, res,next) => {
        const category = await context.Category.findOne({
            where: {
                Id:req.params.id
            }
        })
        if(category === null) return next(new NotfoundError(res))

        const categoryDto = categoryMapping.GetCategoryDto(category)
        return new OK(res,categoryDto)
    },

    insert : async (req,res,next) => {
        const data = req.body;
        const newCategory = await context.Category.create(data)
        return new OK(res,newCategory)

    },

    update : async (req,res,next) => {
        // Güncellenmek istenen şarta uyan row yoksa hata dönmez, affectedRows = 0 gelir
        const data = req.body;
        const affectedRows = await context.Category.update(data, {
            where: {
                Id:req.params.id
            }
        })

        if(affectedRows == 0) return next(new NotfoundError(res))
        return new OK(res,affectedRows)
    },

    delete : async (req,res,next) => {
        // Silinmek istenen şarta uyan row yoksa hata dönmez, affectedRows = 0 gelir
        const affectedRows = await context.Category.destroy({
            where: {
                Id:req.params.id
            }
        })

        if(affectedRows == 0) return next(new NotfoundError(res))
        return new OK(res,affectedRows)
    }
};
