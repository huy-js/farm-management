const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const FriendController = require("../controllers/FriendController");
const ManagementController = require("../controllers/ManagementController");
let initAPIs = (app) => {
  router.post("/login", AuthController.login);
  router.post("/refresh-token", AuthController.refreshToken);

  //goi isAuth tren api muon kiem tra token
  router.get("/checklogin", AuthMiddleWare.isAuthCheck);

  router.use(AuthMiddleWare.isAuth);
  router.get("/friends", FriendController.friendLists);
  // management
  router.post("/createfarmer", ManagementController.createFarmer);
  router.get("/showfarmer", ManagementController.showFarmer);
  // admin
  router.post("/createcooperation", ManagementController.createCooperation);
  router.get("/showcooperation", ManagementController.showCooperation);
  return app.use("/", router);
};
module.exports = initAPIs;
