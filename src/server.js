import express from "express";

import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config();
import bodyParser from "body-parser";
import configViewEngine from "../config/viewEngine";
import configCors from "../config/cors";
// import connection from "../config/connectDB";
import { createJWT, verifyToken } from "./middleware/JWTAction";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

//config viewEngine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookieParser
app.use(cookieParser());

//connect DB
// connection();

//config CORS
configCors(app);

//config Routes
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
  return res.send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on port = " + PORT);
});
