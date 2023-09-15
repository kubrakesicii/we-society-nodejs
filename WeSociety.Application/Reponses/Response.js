




class OK {
    constructor(res,data) {
        res.status(200).send({
            status:200,
            message:"OK",
            data
        })
        res.end();
    }
}

class SuccessResponse {
    // constructor(res,data, count) {
    constructor(res) {
        res.status(200).send({
            status:200,
            message:"OK",
        })
        res.end();
    }
}


module.exports = {
    OK,SuccessResponse
}