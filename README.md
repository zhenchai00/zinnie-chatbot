# Zinnie ChatBot
- This is the educational chatbot for my University Assessment 

Dependencies that used are: 
```
Express
Ngrok
Dotenv
Body Parser
```

To initialize by getting this project temporary URL, you might need to have installed [NGROK](https://ngrok.com/), you could follow the instruction NGORK provided [here](https://ngrok.com/download)

To start the Ngrok you may need to use the following command, please take note on the port which we have defined in `app.js` will affect on the Ngrok
```shell
ngork http 8080
```

After you get the URL, you may put it at the Google Dialogflow > Fulfillment > Webhook URL

In the meantime you have served the Ngrok, you will need to start this project to make sure it is working by this command
```shell
node ./app.js
```


# License
MIT by zhenchai

You can create your own link-in-bio page for free without notifying me by forking this project under the following conditions:

Do not use the pictures that I have in this repository
Do not intent to use anything in this repository to bad things 