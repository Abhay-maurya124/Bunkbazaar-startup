const { configDotenv } = require("dotenv");
const express = require("express");
configDotenv();
const app = express();
app.use("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log("server is running at", process.env.PORT);
});
