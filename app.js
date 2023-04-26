// Related Dependencies
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const moment = require('moment-timezone');
const fs = require('fs');
const CircularJSON = require('circular-json');
require('dotenv').config();

// Express App
const express = require('express');
const app = express();

// Parse JSON request body
app.use(bodyParser.json());

// Logging incoming request
app.use((req, res, next) => {
    const log = `${getDateTime()} ${req.method} ${req.path}\n`;

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
    let session = requestBody.session;

    if (intent == 'default.welcome') {
        let imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Zinnienbl%C3%BCte_Zinnia_elegans_stack15_20190722-RM-7222254.jpg/1280px-Zinnienbl%C3%BCte_Zinnia_elegans_stack15_20190722-RM-7222254.jpg';
        // let imageUrl = './images/zinnia-flower.jpg';

        // generate the response format
        let response = {
            "fulfillmentText": "This is a text response",
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            getRandomGreetingMsg()
                        ]
                    }
                },
                {
                    "image": {
                        "imageUri": imageUrl
                    }
                },
                {
                    "text": {
                        "text": [
                            "Can I get your name?"
                        ]
                    }
                }
            ],
        }
        res.send(response);
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

/**
 * This is to get the current datetime in utc format
 * @returns {string} datetime in utc format
 */
getDateTime = () => {
    let dateObj = new Date;
    let date = dateObj.toISOString().split('T');

    return date[0] + ' ' + date[1];
}

/**
 * This is the temp logging 
 */
logger = (text) => {
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
getGreetMsg = () => {
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


/**
 * This is to get random greeting message with introduction of the chatbot
 * @returns {string} greet message with introduction
 */
getRandomGreetingMsg = () => {
    let greet = getGreetMsg();
    let phrases = [
        greet + ' I\'m an educational chatbot that know about the Zinnia Flowers.',
        greet + ' I\'m a knowledgeable chatbot on Zinnia Flowers.',
        greet + ' I\'m an expert chatbot on Zinnia Flowers.',
    ]

    let randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}