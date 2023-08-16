const CategoryService = require('../../WeSociety.Application/Services/Category.service')

module.exports = {
    insert: CategoryService.insert,
    getAll: CategoryService.getAll,
    getById: CategoryService.getById,
    update: CategoryService.update,
    delete: CategoryService.delete,
}