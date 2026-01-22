require("dotenv").config(); // Standard way to call dotenv
const express = require("express");
const database = require("./module/database");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
database();
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.get("/api/products", async (req, res) => {
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
      error: err.message // only .message is serializable
    });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server is running at", PORT);
});
