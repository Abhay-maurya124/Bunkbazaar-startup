import mongoose from "mongoose";

const database = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("Database is connected");
  } catch (error) {
    console.log("DB Connection Error:", err);
  }
};

export default database