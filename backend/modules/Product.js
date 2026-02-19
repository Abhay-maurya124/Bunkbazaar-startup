import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    thumbnail: String,
    image: String,
  },
  { timestamps: true, collection: "Bunkbazaar" },
);

export const Product = mongoose.model("Product", productSchema);
