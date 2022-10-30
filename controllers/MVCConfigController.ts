import type { Request, Response } from "express";

export default class MVCConfigController {
  renderConfig(req: Request, res: Response) {
    const configInfo = {
      node_environment: process.env.NODE_ENV,
      mongodb_path: process.env.NODE_ENV.toLowerCase().startsWith("p") ? "<redacted>" : process.env.MONGO_PATH,
      storage: process.env.STORAGE,
      port: process.env.PORT,
      admin_email: process.env.ADMIN_EMAIL,
      session_expire_timer: process.env.SESSION_EXPIRE_TIMER,
    };

    return res.render("config", { configInfo });
  }
}
