import express from "express";
const router = express.Router();
import userRouter from '../controllers/user'
import channelRouter from '../controllers/channel'
router.use("/user", userRouter);
router.use("/channel", channelRouter);

export default router;