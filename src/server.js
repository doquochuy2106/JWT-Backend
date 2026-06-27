import express from "express";

import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
import configViewEngine from "../config/viewEngine";
// import connection from "../config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

//config viewEngine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect DB
// connection();

//config CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH",
    "DELETE",
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

//config Routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on port = " + PORT);
});
