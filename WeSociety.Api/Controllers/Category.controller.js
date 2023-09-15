const { OK } = require('../../WeSociety.Application/reponses/response')
const categoryService = require('../../WeSociety.Application/services/category.service')

module.exports = {
    insert: async (req,res,next) => {
        var data = await categoryService.insert(req.body)
        return new OK(res,data)
    },
    getAll: async (req,res,next) => {
        var data = await categoryService.getAll()
        return new OK(res,data)
    },
    getById: async (req, res,next) => {
        try{
            var data = await categoryService.getById(req.params.id)
            return new OK(res,data)
        }
        catch(err){
            next(err)
        }
   
    },
    update: async (req,res,next) => {
        try {
            var data = await categoryService.update(req.params.id,req.body)
            return new OK(res,data)
        }
        catch(err){
            next(err)
        }
    },
    delete: async (req,res,next) => {
        try {
            var data = await categoryService.delete(req.params.id)
            return new OK(res,data)
        }
        catch(err){
            next(err)
        }
    }
}