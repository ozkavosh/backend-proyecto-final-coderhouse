"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
const logger_1 = __importDefault(require("./utils/logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
let env = process.env.NODE_ENV || "dev";
if (env.toLowerCase().startsWith("p"))
    env = "prod";
(0, dotenv_1.config)({ path: `./${env}.env` });
if (process.env.STORAGE == "firestore") {
    const configDir = (0, fs_1.readdirSync)('./config');
    if (!configDir.includes("firebase.json")) {
        logger_1.default.error("STORAGE set to Firestore, but ./config/firebase.json service account file was not found");
        process.exit(1);
    }
    const serviceAccount = require("./config/firebase.json");
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
    });
}
if (process.env.STORAGE === "mongo") {
    if (!process.env.MONGO_PATH) {
        logger_1.default.error("STORAGE set to MongoDB, but MongoDB Url was not provided");
        process.exit(1);
    }
    mongoose_1.default.connect(process.env.MONGO_PATH, () => {
        logger_1.default.debug("Connected to MongoDB");
    });
}
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8080;
app_1.default.listen(PORT, () => {
    logger_1.default.info(`Server ready listening on port ${PORT}`);
});
