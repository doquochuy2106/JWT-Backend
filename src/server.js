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

//config Routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on port = " + PORT);
});
