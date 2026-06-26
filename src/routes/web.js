import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHellowWord);

  router.get("/user", homeController.handleUserPage);

  router.post("/users/create-user", homeController.handleCreateNewuser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUSerByid);
  router.post("/user/update-user", homeController.handleUpdateUser);

  router.get("/api/test-api", apiController.testApi);

  return app.use("/", router);
};

export default initWebRoutes;
