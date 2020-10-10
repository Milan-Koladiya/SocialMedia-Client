const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

express.static(path.join(__dirname, "public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// if (process.env.NODE_ENV === "production") {
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname,  "index.html"));
//   });
// }

app.listen(PORT);
