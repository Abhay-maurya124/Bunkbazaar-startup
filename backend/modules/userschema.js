import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isverified: { type: Boolean, default: false },
    islogged: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpexpiry: { type: Date, default: null },
    cart: {
      ProductId: {
        type: mongoose.Schema.ObjectId,
        ref: "Bunkbazaar",
      },
      quantity: { type: number, default: 0 },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("user", userschema);
