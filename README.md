# Mailbot

Mailbot is a leight and easy to use mailing bot built with NodeJS and nodemailer. By creating email lists and HTML templates you can easily send your templates to the emails in the list.

# Usage

    yarn start --template <NAME> --list <NAME> --subject <SUBJECT>

## Templates

Mail Bot automatically searches the ./templates folder for HTML templates that have the .template.html suffix.

    Example: ./templates/test.template.html
    Name: test

## Lists

Mail Bot automatically searches the ./lists folder for email lists that have the .csv file extension.

    Example: ./lists/test.csv
    Name: test

## Configuration

In the configuration file ./config.json you can save the SMTP settings, of the email that sends the emails.

    {

		"smtpCredentials": {

			"host": "HOST",

			"port": 587,

			"secure": false,

			"username": "USERNAME",

			"password": "PASSWORD"

		},
		"emailFrom": "SENDER_NAME",
		"dkim": {
			"active": false,
			"domain": "DKIM_DOMAIN",
			"selector": "DKIM_SELECTOR",
			"keyName: "DKIM_KEY_NAME
		}

	}

# DKIM Authentication

Mail Bot automatically searches the ./keys folder for keys that have the .key file extension.

    Example: ./keys/mail.key
    Name: mail

Make sure to edit the ./config.json file with the DKIM settings and save the public key as a TXT Record in your domain.


