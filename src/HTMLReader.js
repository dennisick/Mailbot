const fs = require('fs');

function readHTMLFromTemplate(templateName) {
    let html = '';

    try {
        const buffer = fs.readFileSync('./templates/' + templateName + '.template.html');
        html = buffer.toString();
    } catch (error) {
        console.error(error);
    }

    return html;
}

module.exports = readHTMLFromTemplate;