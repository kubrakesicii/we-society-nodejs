const ErrorHandlerMiddleware = (err, req, res, next) => {
    console.log("Error handler");
    console.log("Error : ",err);

    res.status(err.status).send({
        success:err.success,
        message:err.message,
        data:null
    })
    res.end();
}

module.exports = ErrorHandlerMiddleware;

