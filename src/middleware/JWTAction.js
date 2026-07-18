import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = () => {
  let payload = { name: "DoQuocHuy", address: "HoChiMinh" };
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log("check error: ", error);
  }
  console.log("check token: ", token);
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log("check error: ", error);
  }
  return decoded;
};

module.exports = {
  createJWT,
  verifyToken,
};
