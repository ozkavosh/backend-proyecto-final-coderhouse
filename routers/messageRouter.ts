import { Router } from "express";
import MessageService from "../services/MessageService";
import MessageController from "../controllers/MessageController";
import MessageRepository from "../repositories/MessageRepository";
import jwtAuthRoute from "../middlewares/jwtAuthRoute";

const messageRepository = MessageRepository.getInstance();
const messageService = MessageService.getInstance(messageRepository);
const messageController = new MessageController(messageService);
const messageRouter = Router();

messageRouter.post(
  "/",
  jwtAuthRoute,
  messageController.postMessage.bind(messageController)
);
messageRouter.get(
  "/",
  jwtAuthRoute,
  messageController.getMessages.bind(messageController)
);
messageRouter.get(
  "/:id",
  jwtAuthRoute,
  messageController.getMessage.bind(messageController)
);
messageRouter.put(
  "/:id",
  jwtAuthRoute,
  messageController.putMessage.bind(messageController)
);
messageRouter.delete(
  "/:id",
  jwtAuthRoute,
  messageController.deleteMessage.bind(messageController)
);
messageRouter.delete(
  "/",
  jwtAuthRoute,
  messageController.deleteMessages.bind(messageController)
);

export default messageRouter;
