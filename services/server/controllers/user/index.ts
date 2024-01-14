import express, { Request, Response } from "express";
const userRouter = express.Router({ mergeParams: true });
import { StreamChat } from "stream-chat";

userRouter.post("/create", async (req: Request, res: Response) => {
    try {
        const apiKey = process.env.GETSTREAM_API_KEY as string;
        const apiSecret = process.env.GETSTREAM_API_SECRET as string;
        const chatClient = new StreamChat(apiKey, apiSecret);
        const { username } = req.body;
        const user = await chatClient.upsertUser({
            id: username,
            name: username,
        });
        res.json({ success: true, message: "User created successfully", user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

userRouter.get('/get-user-list', async (req: Request, res: Response) => {
    try {
        const apiKey = process.env.GETSTREAM_API_KEY as string;
        const apiSecret = process.env.GETSTREAM_API_SECRET as string;
        const chatClient = new StreamChat(apiKey, apiSecret);
        const options = { role: 'user' };
        const response = await chatClient.queryUsers(options);

        res.json({ success: true, users: response.users });
    } catch (error) {
        console.error('Error getting user list:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default userRouter;