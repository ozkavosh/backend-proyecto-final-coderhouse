import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: "string" },
  price: { type: "number" },
  category: { type: "string" },
  description: { type: "string" },
  photoUrl: { type: "string" },
});

export default model("Product", productSchema, "products");
