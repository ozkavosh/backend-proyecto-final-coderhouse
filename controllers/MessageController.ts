import type { Request, Response } from "express";
import type MessageService from "../services/MessageService";

export default class MessageController {
  service: MessageService;

  constructor(service: MessageService) {
    this.service = service;
  }

  async postMessage(req: Request, res: Response) {
    const message = req.body;
    if (message) {
      const newMessage = await this.service.save(message);
      if (!("errors" in newMessage)) {
        return res.json(newMessage);
      } else {
        return res.status(402).json(newMessage);
      }
    }
    return res.status(402).json({ error: "Missing request body" });
  }

  async getMessages(req: Request, res: Response) {
    const messages = await this.service.getAll();
    if (messages) {
      return res.json(messages);
    }
    return res.status(500).json({ error: "Server error" });
  }

  async getMessage(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const message = id.includes("@") ? await this.service.getByEmail(id) : await this.service.getById(id);
      if (!("errors" in message)) {
        return res.json(message);
      } else {
        return res.status(402).json(message);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing message id" });
  }

  async putMessage(req: Request, res: Response) {
    const id = req.params.id;
    const message = req.body;
    if (message && id) {
      const newMessage = await this.service.update(id, message);
      if (!("errors" in newMessage)) {
        return res.json(newMessage);
      } else {
        return res.status(402).json(newMessage);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing request body or message id" });
  }

  async deleteMessage(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const deleteResult = await this.service.deleteById(id);
      if (!("errors" in deleteResult)) {
        return res.json(deleteResult);
      } else {
        return res.status(402).json(deleteResult);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing message id" });
  }

  async deleteMessages(req: Request, res: Response){
    res.json(await this.service.deleteAll());
  }
}
