const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

express.static(path.join(__dirname, "public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end", "index.html"));
  });
}

app.listen(PORT);
