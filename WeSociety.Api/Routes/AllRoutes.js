const CategoryRouter = require('./Category.route')




module.exports = (app) => {
    app.use('/categories', CategoryRouter);
}