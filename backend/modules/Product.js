import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    image: String,
  },
  { timestamps: true,collection:"Bunkbazzar" }
);

export const Product = mongoose.model("Product", productSchema);
