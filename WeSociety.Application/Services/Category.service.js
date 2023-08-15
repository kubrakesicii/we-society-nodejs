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
        const category = await context.Categories.findAll({
            where: {
                Id:req.params.id
            }
        })
        if(category.length == 0) next(new NotfoundError(res))

        else {
            return new OK(res,category)
        }
    }
};
