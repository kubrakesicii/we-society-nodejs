const context = require('../../WeSociety.Persistence/Context/DbContext')
const {OK} = require('../Reponses/Response')

module.exports = {
    getAll : async (req, res) => {
        const categories = await context.Categories.findAll()
        console.log("RES : ", categories);
        return new OK(res,categories)
    },

    getById : async (req, res) => {
        const category = await context.Categories.findAll({
            where: {
                Id:req.params.id
            }
        })
        console.log("RES : ", category);
        return new OK(res,category)
    }
};
