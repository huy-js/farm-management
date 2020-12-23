const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const FriendController = require("../controllers/FriendController");
const ManagementController = require("../controllers/ManagementController");
const ManagementDiaryController = require("../controllers/ManagementDiaryController");
const multer = require("multer");
const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });

const uploadManyFiles = multer({ storage: storage });
let initAPIs = (app) => {
  //all
  router.post("/login", AuthController.login);
  router.post("/register", AuthController.register);
  // diary farmer
  router.post("/loginfarmer", AuthController.loginFarmer);
  router.get("/getMap/:idfarmer", ManagementDiaryController.getMapFarmer);
  router.post(
    "/writediary",
    //  upload.single("dataImage"),
    uploadManyFiles.array("dataImage", 5),
    ManagementDiaryController.writeDiary
  );
  // api find infor product continue :))
  router.get("/search/:dataQR", ManagementController.searchProductQR);
  //tam de o day update qr sold
  router.post("/updateqrsold", ManagementController.updateQrSold);
  router.post("/getdiaryfarmer", ManagementDiaryController.getDiaryFarmer);
  router.post("/getbatchstump", ManagementDiaryController.getBatchStump);
  router.post("/deletediary", ManagementDiaryController.deleteDiaryByFarmer);
  router.get(
    "/getdatafarmerprofile/:id",
    ManagementDiaryController.getDataFarmerProfile
  );
  //goi isAuthcheck sau moi lan vao 1 duong dan trong react
  router.get("/checklogin", AuthMiddleWare.isAuthCheck);
  // kiem tra trang thai dang nhap tai server
  //cac duong dan nam sau router nay can dam bao da dang nhap
  router.post("/checkout", AuthController.checkout);
  router.use(AuthMiddleWare.isAuth);
  // router test => api => controller => res.json cho client
  router.get("/friends", FriendController.friendLists);
  // management
  // client => api => controller => mongo luu data
  //user
  router.post("/createfarmer", ManagementController.createFarmer);
  router.put("/updatedatafarmer", ManagementController.updateDataFarmer);
  router.put("/deletefarmer", ManagementController.deleteFarmer);
  router.get("/showfarmer/:id", ManagementController.showFarmer);
  //router.get("/getpwfarmer/:id", ManagementController.getDataPWFarmer);
  router.put("/updatePassword", AuthController.updatePasswordUser);
  router.post("/createCompany", ManagementController.createCompany);
  router.get("/showbusiness/:id", ManagementController.showBusiness);
  router.put("/deletebusiness", ManagementController.deleteBusiness);
  // diary
  // router.get("/getdiaryfarmer/:data", ManagementDiaryController.getDiaryFarmer);
  router.get(
    "/showlistfarmer/:id/:limit",
    ManagementDiaryController.showListFarmer
  );
  router.get("/showlistbatch/:id", ManagementDiaryController.showListBatch);
  router.put("/updatemapbatch", ManagementDiaryController.updateMapBatch);
  router.put(
    "/updatebatchcountStump",
    ManagementDiaryController.updateBatchCountStump
  );
  router.put("/deleteStump", ManagementDiaryController.deleteStump);
  router.post("/confrommap", ManagementDiaryController.conFromMap);
  router.post("/checkmap", ManagementDiaryController.checkMap);
  router.post("/getdatadiary", ManagementDiaryController.getDataDiary);
  // user view diary
  router.get(
    "/showimagediary/:id",
    ManagementDiaryController.showImageDiaryFarmer
  );
  // order
  router.get("/showCoopare/:id", ManagementController.showCooperation);
  router.post("/createdataorder", ManagementController.createDataOrder);
  // admin
  router.get("/showlistuser/:iduser", ManagementController.showListUser);
  router.get("/showcooperation/:iduser", ManagementController.showCooperaTion);
  router.put("/updateactive", ManagementController.updateActiveUser);
  router.put("/createPwandSendMail", ManagementController.createPwAndSendMail);
  router.get("/showlistorder", ManagementController.showListOrder);
  //router.post("/createlistqr", ManagementController.createListQR);
  router.post("/createlistqr", ManagementController.newCreateQR);

  return app.use("/", router);
};
module.exports = initAPIs;
