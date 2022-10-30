import { Schema, model } from "mongoose";

const userSchema = new Schema({
  password: { type: "string" },
  name: { type: "string" },
  email: { type: "string" },
  cellphone: { type: "number" },
});

export default model("User", userSchema);
