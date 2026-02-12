import mongoose from "mongoose";

const session = new mongoose.Schema({
  userid: { type: mongoose.Schema.ObjectId, ref: "User" },
 
});

export const tempSession = mongoose.model("session", session);
