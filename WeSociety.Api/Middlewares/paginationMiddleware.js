const paginationMiddleware = (req, res, next) => {
    req.query.pageIndex = (parseInt(req.query.pageIndex) - 1) * parseInt(req.query.pageSize);
    req.query.pageSize = parseInt(req.query.pageSize);
    next()
}

module.exports = paginationMiddleware;

