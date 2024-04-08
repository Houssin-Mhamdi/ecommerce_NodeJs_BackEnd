const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 4000;
dbConnect();

const sendMail = require("./sendEmails.js");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/token", async (req, res) => {
  const { uertokn } = req.body;
  let userOneToken = "firstuserToken";
  const salt = await bcrypt.genSaltSync(10);
  userOneToken = await bcrypt.hashSync(userOneToken, salt);
  const theCompairedToken = await bcrypt.compare(uertokn, userOneToken);
  if (theCompairedToken) {
    res.json({ message: "you are authorized ", userOneToken });
  } else {
    res.json({ message: "you are not authorized please check your token" });
  }
});

app.get("/tn", (req, res) => {
  const user = true;
  const admin = false;
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
