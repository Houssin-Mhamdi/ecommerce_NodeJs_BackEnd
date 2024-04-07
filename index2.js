const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const app = express();
const PORT = process.env.PORT || 4000;
dbConnect();

const sendMail = require("./sendEmails.js");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/tn", (req, res) => {
  const user = false;
  const admin = true;
  if (user) {
    return res.redirect("/us");
  }
  if (admin) {
    return res.send("this is content for admins");
  }
});

app.get("/us", (req, res) => {
  res.send("this is content for normal users");
});

app.post("/", (req, res) => {
  const { from, text } = req.body;
  if (!text) {
    return res.status(422).send({ error: "You must provide a text" });
  }
  sendMail(from, text);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
