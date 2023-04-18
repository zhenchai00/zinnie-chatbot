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

// Handle incoming POST requests to /webhook
app.post('/webhook', (req, res) => {
    logger('request  ' + CircularJSON.stringify(req));
    logger('response  ' + CircularJSON.stringify(res));

    let responseText = handleTelegramMessage(req, res);
    logger('responseText  ' + responseText);
    
    // need to figure out how to response back to dialogflow intent message based on condition
    return res.json(responseText);


    // // Extract relevant data from the request
    // const intent = req.body.queryResult.intent.displayName;
    // const timezone = req.body.queryResult.parameters.timezone;

    // // Perform desired actions based on the intent
    // // if (intent === 'greeting') {
    //     // Use the timezone to calculate current time in user's timezone
    //     const currentTime = new Date().toLocaleString('en-US', {
    //         timeZone: timezone
    //     });

    //     // Generate response message with personalized greeting
    //     const response = {
    //         fulfillmentText: `Hello! It's currently ${currentTime} in your timezone.`,
    //     };

    //     // Send response back to Dialogflow
    //     res.json(response);
    // // }
    // // res.json();
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

// handle user timezone
function handleTelegramMessage (req, res) {
    const message = req.body.originalDetectIntentRequest.payload.data;

    // Get the user's timezone offset from the message date
    const date = new Date(message.date * 1000);
    const timezoneOffset = date.getTimezoneOffset();

    // Get the user's timezone name from the timezone offset
    const timezoneName = moment.tz.zone(moment.tz.guess()).abbr(timezoneOffset);

    // Build a response based on the user's timezone
    let responseText;
    if (timezoneOffset < 0) {
        responseText = `It's currently ${moment().utcOffset(timezoneOffset).format('h:mm A')} on the previous day in ${timezoneName}.`;
    } else {
        responseText = `It's currently ${moment().utcOffset(timezoneOffset).format('h:mm A')} on ${timezoneName}.`;
    }

    // Send the response back to the user
    return responseText;
}