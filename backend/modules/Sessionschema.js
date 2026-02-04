import mongoose from "mongoose";
import { User } from "./userschema.js";

const session = new mongoose.Schema({
  userid: { type: mongoose.Schema.ObjectId, ref: "User" },
});

export const tempSession = mongoose.model("session", session);
