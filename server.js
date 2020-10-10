const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("Milan-Koladiya");
});

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end", "index.html"));
  });
}

app.listen(PORT);
