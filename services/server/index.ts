import { config } from 'dotenv';
config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StreamChat } from 'stream-chat';

const app = express();
import router from './routes/routes';
app.use(express.json());
app.use(cors());

const allowCrossDomain = function (req: Request, res: Response, next: NextFunction) {
    const allowOrigin = req.headers.origin || "*";
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
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
app.use("/",router);

const PORT = process.env.PORT || 8080;
const apiKey = process.env.GETSTREAM_API_KEY;
const apiSecret = process.env.GETSTREAM_API_SECRET;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});

// Uncomment the following lines if you're using Vonage
/* 
const Vonage = require('@vonage/server-sdk');
global.vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    applicationId: process.env.VONAGE_APPLICATION_ID,
    privateKey: process.env.VONAGE_PRIVATE_KEY
});

// Uncomment the following lines if you're using StreamChat
// global.chatClient = new StreamChat(apiKey, apiSecret);
*/
