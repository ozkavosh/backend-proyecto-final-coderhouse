import { readdirSync } from 'fs';
import { config } from "dotenv";
import logger from "./utils/logger";
import mongoose from "mongoose";
import admin from "firebase-admin";

let env = process.env.NODE_ENV || "dev";
if (env.toLowerCase().startsWith("p")) env = "prod";

config({ path: `./${env}.env` });

if (process.env.STORAGE == "firestore") {
  const configDir = readdirSync('./config');
  if(!configDir.includes("firebase.json")){
    logger.error("STORAGE set to Firestore, but ./config/firebase.json service account file was not found");
    process.exit(1);
  }

  const serviceAccount = require("./config/firebase.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

if (process.env.STORAGE === "mongo") {
  if(!process.env.MONGO_PATH){
    logger.error("STORAGE set to MongoDB, but MongoDB Url was not provided");
    process.exit(1);
  }
  mongoose.connect(process.env.MONGO_PATH, () => {
    logger.debug("Connected to MongoDB");
  });
}

import app from "./app";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`Server ready listening on port ${PORT}`);
});
