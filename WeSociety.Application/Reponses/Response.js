




class OK {
    // constructor(res,data, count) {
    constructor(res,data) {
        res.status(200).send({
            status:200,
            message:"OK",
            data
        })
        res.end();
    }
}


module.exports = {
    OK
}