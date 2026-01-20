require("dotenv").config(); // Standard way to call dotenv
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGOURI)
  .then(() => console.log('✅ Database is connected'))
  .catch((err) => console.log('❌ DB Connection Error:', err));

// 2. Simple Home Route
app.get("/", (req, res) => {
  res.send("Server is live!");
});

// 3. The Products API Route
app.get('/api/products', async (req, res) => {
  try {
    // Access the collection you just imported data into
    const products = await mongoose.connection.db
      .collection("Bunkbazaar")
      .find({})
      .toArray();
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server is running at", PORT);
});