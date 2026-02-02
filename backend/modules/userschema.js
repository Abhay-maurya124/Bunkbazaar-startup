import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isverified: { type: Boolean, default: true },
    islogged: { type: Boolean, required: false },
    otp: { type: String, default: null },
    otpexpiry: { type: Date, default: null },
  },
  { timestamps: true },
);

export const user = mongoose.model("user", userschema);
