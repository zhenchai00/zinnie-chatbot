// Related Dependencies
require('dotenv').config();
const bodyParser    = require('body-parser');
const ngrok         = require('ngrok');
const fs            = require('fs');
const CircularJSON  = require('circular-json');
const common        = require('./common.js');

// Express App
const express   = require('express');
const app       = express();

// Parse JSON request body
app.use(bodyParser.json());

// Logging incoming request
app.use((req, res, next) => {
    const log = `${common.getDateTime()} ${req.method} ${req.path}\n`;

    fs.appendFile('./logs/app.log', log, (err) => {
        if (err) console.log(err);
    });

    next();
});

app.get('/', (req, res) => {
    res.send('This only used for POST method request only');
    res.sendStatus(200);
});

// Required intent logic
const intent = require('./intent.js');

// Handle incoming POST requests to /webhook
app.post('/webhook', async (req, res) => {
    let requestBody = req.body;
    let intentName = requestBody.queryResult.intent.displayName;
    let session = requestBody.session;
    let response;

    switch (intentName) {
        case 'default.welcome':
            response = await intent.getWelcomeIntent(requestBody, res);
            res.send(response);
            break;

        case 'plant.origin':
            response = await intent.getPlantOriginIntent(requestBody, res);
            res.send(response);
            break;

        case 'plant.information':
            response = await intent.getPlantInformationIntent(requestBody, res);
            res.send(response);
            break;

        case 'plant.attention':
            response = await intent.getPlantAttentionIntent(requestBody, res);
            res.send(response);
            break;
    
        default:
            break;
    }

});

// Start the server
app.listen(8080, () => {
    console.log('Webhook server listening on http://localhost:8080');
});

// ATTENTION: The following function is to run by node script instead of using the ngrok application
// Connection with Ngrok for getting the random domain URL
// ngrok.connect({
//     proto: 'http',
//     addr: 8080,
// }, (err, url) => {
//     if (err) {
//         console.error('Error while connecting Ngrok', err);
//         return new Error('Ngrok Failed');
//     }
// });
