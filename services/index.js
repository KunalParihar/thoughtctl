require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
//const { Vonage } = require('@vonage/server-sdk')
const { StreamChat } = require('stream-chat');

app.use(express.json());
app.use(cors());
const allowCrossDomain = function (req, res, next) {
    const allowOrigin = req.headers.origin || "*";
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Authentication, x-access-token, x-auth-header, x-refresh-token, authorization, clientid, clientsecret"
    );
    res.header("Access-Control-Expose-Headers", "x-auth-header, x-refresh-token");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    if (req.method === "OPTIONS") {
      res.status(200).send();
    } else {
      next();
    }
  };
app.use(allowCrossDomain);
app.use(require("./server/routes/routes"));
const PORT = process.env.PORT || 8080;
const apiKey = process.env.GETSTREAM_API_KEY;
const apiSecret = process.env.GETSTREAM_API_SECRET;

//const chatClient = new StreamChat(apiKey, apiSecret);
/* global.vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SERECTS,
    applicationId: process.env.VONAGE_APPLICATION_ID,
    privateKey: process.env.VONAGE_PRIVATE_KEY
}); */

//global.chatClient = chatClient;


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})