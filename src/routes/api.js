import express from "express";

import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";

const router = express.Router();

const testMiddleWare = (req, res, next) => {
  console.log("chechk middleware");
  next();
};

const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/account", userController.getUserAccount);

  //Users
  router.get("/users/read", userController.readFunc);
  router.delete("/users/delete", userController.deleteFunc);
  router.post("/users/create", userController.createFunc);
  router.put("/users/update", userController.updateFunc);

  //Groups
  router.get("/groups/read", groupController.readFunc);

  return app.use("/api/v1", router);
};

export default initApiRoutes;
