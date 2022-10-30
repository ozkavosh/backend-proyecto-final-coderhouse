import type { Request, Response } from "express";
import type MessageService from "../services/MessageService";

export default class MVCChatController {
  service: MessageService;

  constructor(service) {
    this.service = service;
  }

  async renderChat(req: Request, res: Response) {
    const email = req.user.email;
    res.render("chat", { email });
  }

  async renderOwnMessages(req: Request, res: Response) {
    const email = req.params.id;
    const messages = await this.service.getByEmail(email);
    res.render("ownMessages", { messages });
  }
}
