// Related Dependencies
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const moment = require('moment-timezone');
const fs = require('fs');
const CircularJSON = require('circular-json');

// Express App
const express = require('express');
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

    
    if (intent == 'default.welcome') {
        // Get greeting based on user timezone
        // let date = requestBody.originalDetectIntentRequest.payload.data.date;
        // let greet = getTelegramUserTimezoneGreet(date);
        res.send(createTextResponse(getGreetMsg()));
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

function getGreetMsg () {
    let now = new Date();
    let hour = now.getHours();

    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
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