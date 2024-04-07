const express = require("express");

const sendMail = require("./sendEmails.js");
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/", (req, res) => {
  const { from, text } = req.body;
  if (!text) {
    return res.status(422).send({ error: "You must provide a text" });
  }
  sendMail(from, text);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
