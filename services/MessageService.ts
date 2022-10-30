import MessageRepository from "../repositories/MessageRepository";
import {isValidMessage, isValidUpdatedMessage} from "../utils/yup-schemas/messageSchema";
import logger from "../utils/logger";

let instance = null;

export default class MessageService {
  repository: MessageRepository;

  constructor(repository: MessageRepository) {
    this.repository = repository;
  }

  async save(object: Object) {
    try {
      await isValidMessage(object);
      return await this.repository.save(object);
    } catch (e: any) {
      logger.debug("Errors saving message: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  static getInstance(repository){
    if(!instance){
      instance = new MessageService(repository);
      return instance;
    }
    return instance;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id: string) {
    if (typeof id !== "string")
      return { errors: "Message id must be a string" };
    return await this.repository.getById(id);
  }

  async getByEmail(email: string) {
    if (typeof email !== "string")
      return { errors: "Message owner email must be a string" };
    return await this.repository.getByEmail(email);
  }

  async update(id: string, object: Object) {
    try {
      await isValidUpdatedMessage(object);
      return await this.repository.update(id, object);
    } catch (e: any) {
      logger.debug("Errors updating message: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async deleteById(id: string) {
    if (typeof id !== "string")
      return { errors: "Message id must be a string" };
    return await this.repository.deleteById(id);
  }

  async deleteAll() {
    return await this.repository.deleteAll();
  }
}
