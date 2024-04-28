const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const connectToDB = require("./config/dbConnect.js");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute.js");
const productRoute = require("./routes/productRoute.js");
const blogRoute = require("./routes/blogRoute.js");
const prodCatRouter = require("./routes/prodCatRoute.js");
const blogcategoryRouter = require("./routes/blogCatRoute.js");
const brandRouter = require("./routes/brandRoute.js");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middelwares/errorHandler.js");
const app = express();
const PORT = process.env.PORT || 4000;
connectToDB();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/category", prodCatRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
