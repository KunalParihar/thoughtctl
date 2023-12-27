const express = require("express"),
	router = express.Router({ mergeParams: true }),
	{ StreamChat } = require("stream-chat");

router.post("/create", async (req, res, next) => {
	const apiKey = process.env.GETSTREAM_API_KEY;
	const apiSecret = process.env.GETSTREAM_API_SECRET;
	const chatClient = new StreamChat(apiKey, apiSecret);
	const { username } = req.body;
	const user = await chatClient.upsertUser({
		id: username,
		name: username,
	});
	res.json({ success: true, message: "User created successfully", user });
});

router.get('/get-user-list', async (req, res) => {
	try {
	  const apiKey = process.env.GETSTREAM_API_KEY;
	  const apiSecret = process.env.GETSTREAM_API_SECRET;
	  const chatClient = new StreamChat(apiKey, apiSecret);
	  const response = await chatClient.queryUsers({role:'user'});
  
	  res.json({ success: true, users: response.users });
	} catch (error) {
	  console.error('Error getting user list:', error);
	  res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
  });
module.exports = router;
