require("dotenv").config(); // Standard way to call dotenv
const express = require("express");
const database = require("./module/database");
const cors = require("cors");
const app = express();
database();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);
app.get("/api/products", async (req, res) => {
  try {
    const products = await mongoose.connection.db
      .collection("Bunkbazaar")
      .find({})
      .toArray();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server is running at", PORT);
});
