import express from "express";

import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config();
import bodyParser from "body-parser";
import configViewEngine from "../config/viewEngine";
import configCors from "../config/cors";
// import connection from "../config/connectDB";
import { createJWT, verifyToken } from "./middleware/JWTAction";

const app = express();
const PORT = process.env.PORT || 8080;

//config viewEngine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect DB
// connection();

//test JWT
createJWT();
let decoded = verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG9RdW9jSHV5IiwiYWRkcmVzcyI6IkhvQ2hpTWluaCIsImlhdCI6MTc4NDM0NDk0NH0.NblmXWP-PE-T8WSzJhQV6KOEe48_aP19jYvDAXOuR1Q",
);

console.log("check verify: ", decoded);

//config CORS
configCors(app);

//config Routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on port = " + PORT);
});
