const CategoryRouter = require('./Category.router')




module.exports = (app) => {
    app.use('/categories', CategoryRouter);
}