const express = require("express");
const dotenv = require("dotenv").config();
const connectToDB = require("./config/dbConnect.js");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute.js");
const app = express();
const PORT = process.env.PORT || 4000;
connectToDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api/user", authRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
