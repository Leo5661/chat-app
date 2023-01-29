import { Router } from "express";
import { addMessage, getAllMessage } from "../controllers/messagesController.js";

const messageRouter = Router();

messageRouter.post('/addMessage', addMessage);
messageRouter.post('/getMessage', getAllMessage);

export default messageRouter;