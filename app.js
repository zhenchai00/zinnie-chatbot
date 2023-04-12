// Related Dependencies
const bodyParser = require('body-parser');
const ngrok = require('ngrok');

// Logger
const pretty = require('pino-pretty');
const pino = require('pino');
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});

// Express App
const express = require('express');
const app = express();

// Parse JSON request body
app.use(bodyParser.json());

// Handle incoming POST requests to /webhook
app.post('/webhook', (req, res) => {
    logger.error(req,res);
    // Extract relevant data from the request
    const intent = req.body.queryResult.intent.displayName;
    const timezone = req.body.queryResult.parameters.timezone;

    // Perform desired actions based on the intent
    // if (intent === 'greeting') {
        // Use the timezone to calculate current time in user's timezone
        const currentTime = new Date().toLocaleString('en-US', {
            timeZone: timezone
        });

        // Generate response message with personalized greeting
        const response = {
            fulfillmentText: `Hello! It's currently ${currentTime} in your timezone.`,
        };

        // Send response back to Dialogflow
        res.json(response);
    // }
    // res.json();
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