var fs = require('fs');

const ConvertFileToByteArray = async (file) => {
    return new Uint8Array(await fs.readFile(file))
}

module.exports = {ConvertFileToByteArray}