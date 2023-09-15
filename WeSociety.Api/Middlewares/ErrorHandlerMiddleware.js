const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(err.status).send({
        success:err.success,
        message:err.message,
        data:null
    })
    res.end();
}

module.exports = errorHandlerMiddleware;

