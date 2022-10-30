import MessageDTO from "../dtos/MessageDTO";
import { messageDAOFactory } from "../factories/messageDAOFactory";
import logger from "../utils/logger";

let instance = null;

export default class MessageRepository {
  dao: any;

  constructor() {
    this.dao = messageDAOFactory(process.env.STORAGE || "memory");
  }

  async save(message: Object) {
    try {
      const createdAt = new Date(Date.now()).toLocaleString();
      const newMessage = await this.dao.save({...message, createdAt});
      return new MessageDTO(newMessage);
    } catch (e) {
      logger.error(e);
      return { errors: "Error saving message" };
    }
  }

  static getInstance(){
    if(!instance){
      instance = new MessageRepository();
      return instance;
    }
    return instance;
  }

  async getAll() {
    try {
      const messages = await this.dao.getAll();
      return messages.map((message: any) => new MessageDTO(message));
    } catch (e) {
      logger.error(e);
      return { error: "Error fetching messages" };
    }
  }

  async getById(id: string) {
    try {
      const message = await this.dao.getById(id);
      if (message) {
        return new MessageDTO(message);
      }
      return { errors: "Message not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching message" };
    }
  }

  async getByEmail(email: string) {
    try {
      const messages = await this.getAll();
      const userMessages = messages.filter((message: any) => message.email === email);
      if (userMessages) {
        return userMessages.map(message => new MessageDTO(message));
      }
      return { errors: "Messages not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching messages" };
    }
  }

  async update(id: string, updatedMessage: Object){
    try {
      const message = await this.dao.update(id, updatedMessage);
      if (message) {
        return new MessageDTO(message);
      }
      return { errors: "Message not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error updating message" };
    }
  }

  async deleteById(id: string){
    try {
      const message = await this.dao.deleteById(id);
      if (message) {
        return { success: true };
      }
      return { errors: "Message not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing message" };
    }
  }

  async deleteAll(){
    try {
      await this.dao.deleteAll();
      return { success: true };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing messages" };
    }
  }
}
