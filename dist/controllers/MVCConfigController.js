"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MVCConfigController {
    renderConfig(req, res) {
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
exports.default = MVCConfigController;
