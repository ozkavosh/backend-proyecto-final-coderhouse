import type UserRepository from "../repositories/UserRepository";
import {isValidRegisterUser} from "../utils/yup-schemas/userSchema";
import { encryptPassword } from "../utils/password";
import logger from "../utils/logger";

let instance = null;

export default class UserService {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async save(object: any) {
    try {
      await isValidRegisterUser(object);
      const users = await this.repository.getAll();
      if(users.some((user) => user.email === object.email)) return { errors: "User email already exists" };
      return await this.repository.save({...object, password: encryptPassword(object.password)});
    } catch (e: any) {
      logger.debug("Errors saving user: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  static getInstance(repository){
    if(!instance){
      instance = new UserService(repository);
      return instance;
    }
    return instance;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id: string) {
    if (typeof id !== "string") return { errors: "User id must be a string" };
    return await this.repository.getById(id);
  }

  async getByEmail(email: string) {
    if (typeof email !== "string") return { errors: "User email must be a string" };
    return await this.repository.getByEmail(email);
  }

  async update(id: string, object: Object) {
    try {
      await isValidRegisterUser(object);
      return await this.repository.update(id, object);
    } catch (e: any) {
      logger.debug("Errors updating user: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async deleteById(id: string) {
    if (typeof id !== "string") return { errors: "User id must be a string" };
    return await this.repository.deleteById(id);
  }

  async deleteAll() {
    return await this.repository.deleteAll();
  }
}
