"use strict";

const nodemailer = require('nodemailer');
const config = require('../config.json');
const readList = require('./ListReader');
const readHTML = require('./HTMLReader');
const readKey = require('./KeyReader');

async function main() {

    const args = process.argv;
    const templateIndex = args.indexOf('--template') + 1;
    const listIndex = args.indexOf('--list') + 1;
    const subjectIndex = args.indexOf('--subject') + 1;

    if (templateIndex == 0) {
        console.error('No template defined');
        return;
    }

    if (listIndex == 0) {
        console.error('No list defined');
        return;
    }

    if (subjectIndex == 0) {
        console.error('No subject found');
        return;
    }

    const template = args[templateIndex];
    const list = args[listIndex];
    const subject = args[subjectIndex];

    const transport = nodemailer.createTransport({
        host: config.smtpCredentials.host,
        port: config.smtpCredentials.port,
        secure: config.smtpCredentials.secure,
        auth: {
            user: config.smtpCredentials.username,
            pass: config.smtpCredentials.password
        },
        dkim: config.dkim.active ? {
            domainName: config.dkim.domain,
            keySelector: config.dkim.selector,
            privateKey: readKey(config.dkim.keyName)
        } : null
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

    for (const email of listData) {
        console.log('Sending e-mail template ' + template + ' to ' + email);

        await transport.sendMail({
            from: config.emailFrom + '<' + config.smtpCredentials.username + '>',
            subject: subject,
            to: email,
            html: html,
        });
    };

}

main();