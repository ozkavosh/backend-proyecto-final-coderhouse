import UserDTO from "../dtos/UserDTO";
import { userDAOFactory } from "../factories/userDAOFactory";
import logger from "../utils/logger";

let instance = null;

export default class UserRepository {
  dao: any;

  constructor() {
    this.dao = userDAOFactory(process.env.STORAGE || "memory");
  }

  async save(user: Object) {
    try {
      const newUser = await this.dao.save(user);
      return new UserDTO(newUser);
    } catch (e) {
      logger.error(e);
      return { errors: "Error saving user" };
    }
  }

  static getInstance(){
    if(!instance){
      instance = new UserRepository();
      return instance;
    }
    return instance;
  }

  async getAll() {
    try {
      const users = await this.dao.getAll();
      return users.map((user: any) => new UserDTO(user));
    } catch (e) {
      logger.error(e);
      return { error: "Error fetching users" };
    }
  }

  async getById(id: string) {
    try {
      const user = await this.dao.getById(id);
      if (user) {
        return new UserDTO(user);
      }
      return { errors: "User not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching user" };
    }
  }

  async getByEmail(email: string) {
    try {
      const users = await this.dao.getAll();
      const user = users.find((user: any) => user.email === email);
      if (user) {
        return {...new UserDTO(user), password: user.password};
      }
      return { errors: "User not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching user" };
    }
  }

  async update(id: string, updatedUser: Object){
    try {
      const user = await this.dao.update(id, updatedUser);
      if (user) {
        return new UserDTO(user);
      }
      return { errors: "User not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error updating user" };
    }
  }

  async deleteById(id: string){
    try {
      const user = await this.dao.deleteById(id);
      if (user) {
        return { success: true };
      }
      return { errors: "User not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing user" };
    }
  }

  async deleteAll(){
    try {
      await this.dao.deleteAll();
      return { success: true };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing users" };
    }
  }
}
