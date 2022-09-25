const fs = require("fs");

function getEmailsFromList(listName) {
    const list = [];

    try {
        const buffer = fs.readFileSync('./lists/' + listName + '.csv');
        const data = buffer.toString();

        data.split('\n').forEach(email => {
            list.push(email);
        });
    } catch (error) {
        console.error(error);
    }

    return list;
}

module.exports = getEmailsFromList;