const fs = require("fs");

function getKeyFromFile(keyName) {
    let data = '';

    try {
        const buffer = fs.readFileSync('./keys/' + keyName + '.key');
        data = buffer.toString();
    } catch (error) {
        console.error(error);
    }

    return data;
}

module.exports = getKeyFromFile;