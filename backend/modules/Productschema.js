import mongoose from "mongoose";

const productschema = new mongoose.Schema(
  {
    username: { type: String },
    description: { type: String },
    price: { type: Number },
  },
  { collection: "Bunkbazaar" },
);
console.log(mongoose.modelNames());
export const Product = mongoose.model("Bunkbazaar", productschema);
