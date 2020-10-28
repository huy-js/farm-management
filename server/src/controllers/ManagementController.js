const userModel = require("../models/userModel");
const coopertationModel = require("../models/cooperationModel");
const farmerModel = require("../models/farmerModel");
const orderModel = require("../models/orderModel");
const qrCodeModel = require("../models/qrCodeModel");
const qrcode = require("qrcode");
const generator = require("generate-password");

const bcrypt = require("bcrypt");
const saltRounds = 7;

const sendMail = require("../helpers/sendmail.helper");
//const cooperationModel = require("../models/cooperationModel");
// async await luon di voi nhau
let showListUser = async (req, res) => {
  try {
    let dataListUser = await userModel.showListUser();
    return res.status(200).json(dataListUser);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let updateActiveUser = async (req, res) => {
  try {
    // console.log(req.body.id);
    let oldActive = await userModel.findActiveById(req.body.id);
    //  console.log(oldActive);
    if (oldActive === null)
      return res.status(500).json({ message: "user undefinded" });

    await userModel.updateActiveUser(req.body.id, oldActive.isActive);
    return res.status(200).json({ message: "success update" });
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};

let createPwAndSendMail = async (req, res) => {
  try {
    // console.log(req.body.id);
    let dataUser = await userModel.findActiveById(req.body.id);
    //  console.log(dataUser);
    if (dataUser === null)
      return res.status(500).json({ message: "user undefinded" });

    let ranDomPassWord = generator.generate({
      length: 5,
      numbers: true,
    });
    //console.log(ranDomPassWord);
    let salt = bcrypt.genSaltSync(saltRounds); // tao muoi bam :))
    let password = bcrypt.hashSync(ranDomPassWord, salt);
    //console.log(password)
    await userModel.createPassward(dataUser._id, password);
    sendMail(dataUser.email, ranDomPassWord)
      .then((success) => {
        return success;
      })
      .catch(async (error) => {
        // remove user
        // xoa user dang ky
        await userModel.removeById(dataUser._id);
        // xoa htx
        await coopertationModel.removeById(dataUser._id);

        return error;
      });

    return res
      .status(200)
      .json({ message: "success update", passwork: ranDomPassWord });
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};

let createFarmer = async (req, res) => {
  try {
    console.log(req.body.dataFamer);
    let data = req.body.dataFamer;
    let ranDomPassWord = generator.generate({
      length: 5,
      numbers: true,
    });
    //console.log(ranDomPassWord);
    let salt = bcrypt.genSaltSync(saltRounds); // tao muoi bam :))
    let password = bcrypt.hashSync(ranDomPassWord, salt);

    let idCoopera = await coopertationModel.findIdCoopera(data.idUser);
    //console.log(idCoopera);
    if (idCoopera) {
      delete data["idUser"];
      data.password = password;
      data.CooperativeId = idCoopera._id;
    } else {
      return res.status(500).json({ message: "khong tim thay htx lien quan" });
    }

    //console.log(data);
    let totalarea = idCoopera.landArea + data.landArea;
    let totaltree = idCoopera.totalTrees + data.totalTrees;
    // goi await tai vi tri can truy van data
    // bac cac tuyen trinh doi truyen trinh nay song moi dc lam tuyen trinh khac
    await farmerModel.createNew(data); // createNew laf function dc tao trong file model
    // update data htx dien tich va so nong ho
    await coopertationModel.updateLandAndTotalTree(
      idCoopera._id,
      totalarea,
      totaltree,
      idCoopera.memberfarmer + 1
    );
    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let showFarmer = async (req, res) => {
  try {
    let idUser = req.params.id;
    console.log(idUser);
    let idCoopera = await coopertationModel.findIdCoopera(idUser);

    let getData = await farmerModel.showFarmer(idCoopera._id);
    getData.map(async (e) => {
      let pw = await bcrypt.compareSync(e.password);
      console.log(pw);
    });
    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json({ message: "get data farmer" });
  }
};
let showCooperation = async (req, res) => {
  try {
    let idUser = req.params.id;
    // console.log(idUser);
    let dataCooperation = await coopertationModel.showCooperation(idUser);
    //console.log(dataCooperation);
    return res.status(200).json(dataCooperation);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let createDataOrder = async (req, res) => {
  try {
    console.log(req.body.dataOrder);
    await orderModel.createNew(req.body.dataOrder);
    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let showListOrder = async (req, res) => {
  try {
    let dataListOrder = await orderModel.showListOrder();
    return res.status(200).json(dataListOrder);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let createListQR = async (req, res) => {
  try {
    //console.log(req.body.dataQR);
    let idCoopare = await coopertationModel.findIdCoopera(
      req.body.dataQR.idcustomer
    );
    if (idCoopare) {
      let listFarmer = await farmerModel.showFarmer(idCoopare._id); //result array
      // console.log(listFarmer);
      let arrayQR = listFarmer.map(async (e) => {
        let beforeConverQR = idCoopare._id + "/" + e._id;
        return beforeConverQR;
      });
      let convertArrayQR = await Promise.all(arrayQR);
      let afterArrayQR = convertArrayQR.map(async (e) => {
        let qrCode = { qrId: await qrcode.toDataURL(e) };
        return qrCode;
      });
      let doneArrayQR = await Promise.all(afterArrayQR); // array buffer
      // console.log(doneArrayQR);
      let dataDone = {
        idOrder: req.body.dataQR.idOrder,
        arrayQR: doneArrayQR,
      };
      await qrCodeModel.createNew(dataDone);
      await orderModel.updateDefaulQR(req.body.dataQR.idOrder);
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(500).json({ message: "khong tim thay htx" });
    }
    //return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let findInforProduct = async (req, res) => {
  try {
    // console.log("dsadadsa");
    //chua ra
    let idCoopare = req.params.idcoopare;
    let idFarmer = req.params.idfarmer;
    console.log(idCoopare + idFarmer);
    return res.status(200).json(idCoopare);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let searchProduct = async (req, res) => {
  try {
    let data = await orderModel.showListOrder();
    let dataresult = data[0];
    console.log(data);
    return res.status(200).json(dataresult.email);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
module.exports = {
  showListUser: showListUser,
  updateActiveUser: updateActiveUser,
  createPwAndSendMail: createPwAndSendMail,
  createFarmer: createFarmer,
  showFarmer: showFarmer,
  showCooperation: showCooperation,
  createDataOrder: createDataOrder,
  showListOrder: showListOrder,
  createListQR: createListQR,
  findInforProduct: findInforProduct,
  searchProduct: searchProduct,
};
