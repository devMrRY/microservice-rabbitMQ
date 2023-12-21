const express = require("express");
const app = express();
require('./msgQueue');

app.get(
  "/init",
  (req, res, next) => {
    if (req.headers.token) return res.send("Not Authorized");
    next();
  },
  (req, res) => {
    return res.status(200).json({ message: "user service is called" });
  }
);

app.listen(8080, () => {
  console.log("user service is running on port 8080");
});
