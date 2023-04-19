// Related Dependencies
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const moment = require('moment-timezone');
const fs = require('fs');
const CircularJSON = require('circular-json');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Express App
const express = require('express');
const { request } = require('http');
const { env } = require('process');
const app = express();

// Parse JSON request body
app.use(bodyParser.json());

app.use((req, res, next) => {
    const now = new Date();
    const log = `${now.toISOString()} ${req.method} ${req.path}\n`;

    fs.appendFile('./logs/app.log', log, (err) => {
        if (err) console.log(err);
    });

    next();
});

app.get('/', (req, res) => {
    res.sendStatus(200);
});

// Handle incoming POST requests to /webhook
app.post('/webhook', async (req, res) => {
    let requestBody = req.body;
    let intent = requestBody.queryResult.intent.displayName;
    let session = requestBody.session; // projects/zinnie-bot-fhvt/agent/sessions/18e21984-42f0-37e9-a5c2-29a53972f8ba
    let chatId = requestBody.originalDetectIntentRequest.payload.data.chat.id;


    
    if (intent == 'default.welcome') {
        let imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Zinnienbl%C3%BCte_Zinnia_elegans_stack15_20190722-RM-7222254.jpg/1280px-Zinnienbl%C3%BCte_Zinnia_elegans_stack15_20190722-RM-7222254.jpg';
        // let imageUrl = './images/zinnia-flower.jpg';
        let payload = {};
        // payload.push(generateTelegramPayload(getRandomGreetingMsg()));

        // generate the response format
        let response = {
            "fulfillmentText": "This is a text response",
            "fulfillmentMessages": [{
                "text": {
                    "text": [
                        getRandomGreetingMsg()
                    ]
                }
            }],
            "payload": {
                "telegram": {
                    "text": getRandomGreetingMsg(),
                    "parse_mode": "Markdown"
                },
                "telegram": {
                    "type": "photo",
                    "media": imageUrl
                },
                "telegram": {
                    "text": 'Can I get your name?',
                    "parse_mode": "Markdown"
                },
            }
        }
        res.send(response);
        telegramSendPhoto(chatId, imageUrl);
        // res.send(createTextResponse(getGreetMsg()));
    }
});

// Start the server
app.listen(8080, () => {
    console.log('Webhook server listening on http://localhost:8080');
});

// Connection with Ngrok for getting the random domain URL
ngrok.connect({
    proto: 'http',
    addr: process.env.PORT,
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok', err);
        return new Error('Ngrok Failed');
    }
});

getDateTime = () => {
    let dateObj = new Date;
    let date = dateObj.toISOString().split('T');

    return date[0] + ' ' + date[1];
}

function logger (text) {
    let date = getDateTime();
    let log = `${date} ${text} \n`;
    fs.appendFile('./logs/app.log', log, (err) => {
        if (err) console.log(err);
    });
}

/**
 * This is the get the system time and greet based on the system time
 * @returns {string} greeting with 'Good morning!', 'Good afternoon!', 'Good evening'
 */
function getGreetMsg () {
    let now = new Date();
    let hour = now.getHours();

    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning!';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon!';
    } else {
        greeting = 'Good evening!';
    }
    return greeting;
}

// handle user timezone
function getTelegramUserTimezoneGreet (date) {
    // Get the user's timezone offset from the message date
    const mdate = new Date(date * 1000);
    const timezoneOffset = mdate.getTimezoneOffset();

    // Get the user's timezone name from the timezone offset
    const timezoneName = moment.tz.zone(moment.tz.guess()).abbr(timezoneOffset);

    let responseText;
    let greeting;
    if (timezoneOffset < 0) {
        let time = moment().utcOffset(timezoneOffset);
        let hour = time.hour();
        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
        // responseText = `It's currently ${moment().utcOffset(timezoneOffset).format('h:mm A')} on the previous day in ${timezoneName}.`;
    } else {
        let time = moment().utcOffset(timezoneOffset);
        let hour = time.hour();
        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
        // responseText = `It's currently ${moment().utcOffset(timezoneOffset).format('h:mm A')} on ${timezoneName}.`;
    }

    return greeting;
}

function createTextResponse(textResponse) {
    let response = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    textResponse
                ]
            }
        }],
        "payload": {
            "telegram": {
                "text": textResponse,
                "parse_mode": "Markdown"
            }
        }
    }
    return response;
}

/**
 * This is to generate the payload format for Google Dialogflow Telegram integration
 * @param {string} text 
 * @returns {Object} payload format
 */
function generateTelegramPayload (text) {
    let response = {
        "telegram": {
            "text": text,
            "parse_mode": "Markdown"
        }
    }
    return response;
}

/**
 * This is to get random greeting message with introduction of the chatbot
 * @returns {string} greet message with introduction
 */
function getRandomGreetingMsg () {
    let greet = getGreetMsg();
    let phrases = [
        greet + ' I\'m an educational chatbot that know about the Zinnia Flowers.',
        greet + ' I\'m a knowledgeable chatbot on Zinnia Flowers.',
        greet + ' I\'m an expert chatbot on Zinnia Flowers.',
    ]

    let randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

function telegramSendPhoto (chatId, imageUrl) {
    // const chatId = session.split('/').pop();
    const TOKEN = process.env.TELEGRAMBOT_TOKEN;
    const bot = new TelegramBot(TOKEN, {polling: true});
    bot.sendPhoto(chatId,imageUrl);
}