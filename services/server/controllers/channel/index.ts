import express, { Request, Response, NextFunction } from "express";
const channelRouter = express.Router({ mergeParams: true });
import { StreamChat } from "stream-chat";

channelRouter.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey = process.env.GETSTREAM_API_KEY as string;
        const apiSecret = process.env.GETSTREAM_API_SECRET as string;
        const chatClient = new StreamChat(apiKey, apiSecret);
        const { users } = req.body;
        const channel = chatClient.channel('messaging', 'general', {
            created_by_id: users[0],
            members: users,
        });

        const response = await channel.create();
        res.send(response);
    } catch (error:any) {
        res.status(500).json({ success: false, message: error || error.message });
    }
});

export default channelRouter;
