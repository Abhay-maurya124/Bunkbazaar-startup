import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  // Kept as 'userid' to match your existing logic
  userid: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true 
  },
  // Added this for the Admin Panel logic
  lastActivity: { 
    type: Date, 
    default: Date.now 
  }
});

export const tempSession = mongoose.model("session", sessionSchema);