const context = require('../../WeSociety.Persistence/Context/DbContext')

module.exports = {
    getAll : async () => {
        const res = await context.Categories.findAll()
        console.log("RES : ", res);
        return res
    }
};
