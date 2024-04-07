const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const app = express();
const PORT = process.env.PORT || 4000;
dbConnect();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
