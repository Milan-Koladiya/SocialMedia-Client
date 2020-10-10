const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("Milan-Koladiya");
});

app.listen(PORT);
