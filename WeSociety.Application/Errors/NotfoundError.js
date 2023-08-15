class NotfoundError {
    constructor(){
        this.success=false,
        this.status=200,
        this.message="NOTFOUND"
    }
}

module.exports = {NotfoundError};