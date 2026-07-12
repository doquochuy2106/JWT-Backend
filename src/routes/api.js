import express from "express";

import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  //Users
  router.get("/users/read", userController.readFunc);
  router.delete("/users/delete", userController.deleteFunc);

  //Groups
  router.get("/groups/read", groupController.readFunc);

  return app.use("/api/v1", router);
};

export default initApiRoutes;
