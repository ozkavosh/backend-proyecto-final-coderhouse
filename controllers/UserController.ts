import type { Request, Response } from "express";
import type UserService from "../services/UserService";
import { isValidLoginUser } from "../utils/yup-schemas/userSchema";
import { isValidPassword } from "../utils/password";
import generateAccessToken from "../utils/generateAccessToken";

export default class UserController {
  service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async postUser(req: Request, res: Response) {
    const user = req.body;
    if (user) {
      const newUser = await this.service.save(user);
      if (!("errors" in newUser)) {
        return res.json(newUser);
      } else {
        return res.status(402).json(newUser);
      }
    }
    return res.status(402).json({ error: "Missing request body" });
  }

  async postLogin(req: Request, res: Response) {
    try {
      const user = req.body;
      await isValidLoginUser(user);
      const userResult: any = await this.service.getByEmail(user.email);
      if ("errors" in userResult || !isValidPassword(userResult, user.password)) throw { errors: ["Wrong credentials"] };
      delete userResult.password;
      const token = generateAccessToken(userResult);
      res.json({token});
    } catch (e: any) {
      return res.status(400).json({ errors: e.errors.join(" - ") });
    }
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.service.getAll();
    if (users) {
      return res.json(users);
    }
    return res.status(500).json({ error: "Server error" });
  }

  async getUser(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const user = id.includes("@")
        ? await this.service.getByEmail(id)
        : await this.service.getById(id);
      if (!("errors" in user)) {
        return res.json(user);
      } else {
        return res.status(402).json(user);
      }
    }
    return res.status(402).json({ error: "Missing user id" });
  }

  async putUser(req: Request, res: Response) {
    const id = req.params.id;
    const user = req.body;
    if (user && id) {
      const newUser = await this.service.update(id, user);
      if (!("errors" in newUser)) {
        return res.json(newUser);
      } else {
        return res.status(402).json(newUser);
      }
    }
    return res.status(402).json({ error: "Missing request body or user id" });
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const deleteResult = await this.service.deleteById(id);
      if (!("errors" in deleteResult)) {
        return res.json(deleteResult);
      } else {
        return res.status(402).json(deleteResult);
      }
    }
    return res.status(402).json({ error: "Missing user id" });
  }

  async deleteUsers(req: Request, res: Response) {
    res.json(await this.service.deleteAll());
  }
}
