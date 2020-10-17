const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const FriendController = require("../controllers/FriendController");
const ManagementController = require("../controllers/ManagementController");
let initAPIs = (app) => {
  //all
  router.post("/login", AuthController.login);
  router.post("/register", AuthController.register);

  //goi isAuthcheck sau moi lan vao 1 duong dan trong react
  router.get("/checklogin", AuthMiddleWare.isAuthCheck);
  // kiem tra trang thai dang nhap tai server
  //cac duong dan nam sau router nay can dam bao da dang nhap
  router.use(AuthMiddleWare.isAuth);
  // router test => api => controller => res.json cho client
  router.get("/friends", FriendController.friendLists);
  // management
  // client => api => controller => mongo luu data
  //user
  router.post("/createfarmer", ManagementController.createFarmer);
  router.get("/showfarmer/:id", ManagementController.showFarmer);
  
  router.get("/showCoopare/:id", ManagementController.showCooperation);
  // admin
  router.get("/showlistuser", ManagementController.showListUser);
  router.put("/updateactive", ManagementController.updateActiveUser);
  router.put("/createPwandSendMail", ManagementController.createPwAndSendMail);
  return app.use("/", router);
};
module.exports = initAPIs;
