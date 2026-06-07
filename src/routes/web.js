import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHellowWord);

  router.get("/user", homeController.handleUserPage);

  router.post("/users/create-user", homeController.handleCreateNewuser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);

  return app.use("/", router);
};

export default initWebRoutes;
