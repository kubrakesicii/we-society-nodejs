const context = require('../../WeSociety.Persistence/context/dbContext')
const {NotfoundError} = require('../errors/errorResponse')
const categoryMapping = require('../mappings/category.mapping');

module.exports = {
    getAll : async () => {
        const categories = await context.Category.findAll()
        var dtos = categories.map(c => categoryMapping.GetCategoryDto(c))
        return dtos;
    },

    getById : async (id) => {
        const category = await context.Category.findOne({
            where: {
                Id:id
            }
        })
        if(category === null) throw new NotfoundError()
        const categoryDto = categoryMapping.GetCategoryDto(category)
        return categoryDto;
    },

    insert : async (data) => {
        const newCategory = await context.Category.create(data)
        return newCategory;
    },

    update : async (id, data) => {
        // Güncellenmek istenen şarta uyan row yoksa hata dönmez, affectedRows = 0 gelir
        const affectedRows = await context.Category.update(data, {
            where: {
                Id:id
            }
        })

        if(affectedRows == 0) throw new NotfoundError()
        return affectedRows
    },

    delete : async (id) => {
        // Silinmek istenen şarta uyan row yoksa hata dönmez, affectedRows = 0 gelir
        const affectedRows = await context.Category.destroy({
            where: {
                Id:id
            }
        })

        if(affectedRows == 0) throw new NotfoundError()
        return affectedRows
    }
};
