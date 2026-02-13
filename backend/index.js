import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import database from "./modules/database.js";
import route from "./routes/userroutes.js";
const app = express();
database();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/api/products", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const pagenum = parseInt(page || 1);
    const limitnum = parseInt(limit || 10);
    const skipnum = parseInt(pagenum - 1) * limitnum;
    const querysearch = {};
    if (search) {
      querysearch.title = { $regex: search, $options: "i" };
    }
    const products = await mongoose.connection.db
      .collection("Bunkbazaar")
      .find(querysearch)
      .limit(limitnum)
      .skip(skipnum)
      .toArray();
    res.json(products);
  } catch (err) {
    console.error("Error in /api/products:", err);

    res.status(500).json({
      message: "Error fetching products",
      error: err.message, // only .message is serializable
    });
  }
});
app.get("/api/products/all", async (req, res) => {
  try {
    const products = await mongoose.connection.db
      .collection("Bunkbazaar")
      .find({})
      .toArray();
    res.json(products);
  } catch (err) {
    console.error("Error in /api/products:", err);

    res.status(500).json({
      message: "Error fetching products",
      error: err.message,
    });
  }
});
app.get("/user/v3/profile", async (req, res) => {
  try {
    const user = await mongoose.connection.db
      .collection("users")
      .find({})
      .toArray();
    res.json(user);
  } catch (err) {
    console.error("Error in /api/products:", err);

    res.status(500).json({
      message: "Error fetching products",
      error: err.message,
    });
  }
});

app.use("/user/v3", route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});
