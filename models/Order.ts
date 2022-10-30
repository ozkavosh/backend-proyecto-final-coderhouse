import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  products: { type: "array" },
  createdAt: { type: "string" },
  orderNum: { type: "number" },
  status: { type: "string" },
  email: { type: "string" },
});

export default model("Order", orderSchema, "orders");