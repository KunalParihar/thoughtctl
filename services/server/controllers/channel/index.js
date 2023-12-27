const express = require("express"),
	router = express.Router({ mergeParams: true }),
	{ StreamChat } = require("stream-chat");

router.post("/create", async (req, res, next) => {
    try {
        const apiKey = process.env.GETSTREAM_API_KEY;
        const apiSecret = process.env.GETSTREAM_API_SECRET;
        const chatClient = new StreamChat(apiKey, apiSecret);
        const { users } = req.body;
        const channel = chatClient.channel('messaging', 'general', {
        created_by_id: users[0],
        members:users,
        });
        // await channel.create();
        //console.log(channel.channel);
     //   if(channel) {
            res.send(await channel.create());
       // }
        /* else {
            res.status(channel.status).json({ success: false, message: channel.message });
        }
         */
    }
    catch( error ){
        console.log(error);
        res.status(500).json({ success: false, message: error || error.message });
    }
});

module.exports = router;
