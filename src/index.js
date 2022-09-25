"use strict";

const nodemailer = require('nodemailer');
const config = require('../config.json');
const readList = require('./ListReader');
const readHTML = require('./HTMLReader');

async function main() {

    const args = process.argv;
    const templateIndex = args.indexOf('--template') + 1;
    const listIndex = args.indexOf('--list') + 1;

    if (templateIndex == 0) {
        console.error('No template defined');
        return;
    }

    if (listIndex == 0) {
        console.error('No list defined');
        return;
    }

    const template = args[templateIndex];
    const list = args[listIndex];

    const transport = nodemailer.createTransport({
        host: config.smtp_credentials.host,
        port: config.smtp_credentials.port,
        secure: config.smtp_credentials.secure,
        auth: {
            user: config.smtp_credentials.username,
            pass: config.smtp_credentials.password
        }
    });

    const html = readHTML(template);
    if (!html) {
        console.error('Could not read HTML template ' + template);
        return;
    }

    const listData = readList(list);
    if (!listData) {
        console.error('Could not read list ' + list);
        return;
    }

    for(const email of listData) {
        console.log('Sending e-mail template ' + template + ' to ' + email);

        await transport.sendMail({
            from: config.smtp_credentials.username,
            to: email,
            html: html
        });
    };

}

main();