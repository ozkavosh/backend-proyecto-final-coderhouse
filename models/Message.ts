import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  email: { type: "string" },
  createdAt: { type: "string" },
  body: { type: "string" },
});

export default model("Message", messageSchema, "messages");