import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log("check error: ", error);
  }
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

const checkUserJWT = (req, res, next) => {
  let cookie = req.cookies;
  if (cookie && cookie.JWT) {
    let token = cookie.JWT;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EM: "Unauthorized",
        EC: -1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Unauthorized",
      DT: "",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (req.user) {
    let email = req.user.email;
    let role = req.user.roles.Roles;
    let currentPath = req.path;
    if (!role || role.length === 0) {
      return res.status(403).json({
        EM: `You don't have permission`,
        EC: -1,
        DT: "",
      });
    }

    let canAccess = role.some((item) => item.url === currentPath);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EM: `You don't have permission`,
        EC: -1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "Unauthorized",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
