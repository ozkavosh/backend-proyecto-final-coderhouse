import { Schema, model } from "mongoose";

const productSchema = new Schema({
  email: { type: "string" },
  createdAt: { type: "string" },
  products: { type: "array"},
});

export default model("Cart", productSchema, "carts");
