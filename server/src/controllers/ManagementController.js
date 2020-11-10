const userModel = require("../models/userModel");
const coopertationModel = require("../models/cooperationModel");
const farmerModel = require("../models/farmerModel");
const orderModel = require("../models/orderModel");
const qrCodeModel = require("../models/qrCodeModel");
const qrcode = require("qrcode");
require("dotenv").config();
const jwtHelper = require("../helpers/jwt.helper");

const generator = require("generate-password");

const bcrypt = require("bcrypt");
const saltRounds = 7;

const sendMail = require("../helpers/sendmail.helper");
const accessTokenLifeQr = process.env.ACCESS_TOKEN_LIFE_QR;

const accessTokenSecretQr = process.env.ACCESS_TOKEN_SECRET_QR;

// async await luon di voi nhau
let showListUser = async (req, res) => {
  try {
    let id = req.params.iduser;
    // console.log(id);
    if (!(await userModel.checkAdmin(id)))
      return res.status(500).json({ message: "ban khong phai admin" });

    let dataListUser = await userModel.showListUser();
    return res.status(200).json(dataListUser);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let updateActiveUser = async (req, res) => {
  try {
    //  console.log(req.body.data);
    //console.log(await userModel.checkAdmin(req.body.data.iduser));
    if (!(await userModel.checkAdmin(req.body.data.iduser)))
      return res.status(500).json({ message: "ban khong phai admin" });

    let oldActive = await userModel.findActiveById(req.body.data.id);
    //  console.log(oldActive);
    if (oldActive === null)
      return res.status(500).json({ message: "user undefinded" });

    await userModel.updateActiveUser(req.body.data.id, oldActive.isActive);
    return res.status(200).json({ message: "success update" });
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};

let createPwAndSendMail = async (req, res) => {
  try {
    // console.log(req.body.data);
    if (!(await userModel.checkAdmin(req.body.data.iduser)))
      return res.status(500).json({ message: "ban khong phai admin" });
    let dataUser = await userModel.findActiveById(req.body.data.id);
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
    //console.log(req.body.dataFamer);
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
    //  console.log(idUser);
    let idCoopera = await coopertationModel.findIdCoopera(idUser);

    let getData = await farmerModel.showFarmer(idCoopera._id);
    let salt = bcrypt.genSaltSync(saltRounds);
    console.log(salt);
    console.log(getData);
    //Không cần chỗ này
    // getData.map(async (e) => {
    //   let pw = await bcrypt.compareSync(e.password);
    //   console.log(pw);
    // });
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
    let dataOrder = await orderModel.showdataOrder(idUser);
    console.log(dataOrder);
    return res
      .status(200)
      .json({ dataCoo: dataCooperation, dataListOrder: dataOrder });
  } catch (error) {
    return res.status(500).json({ message: "show failed" });
  }
};
let createDataOrder = async (req, res) => {
  try {
    //console.log(req.body.dataOrder);
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
//ko dung'
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

let newCreateQR = async (req, res) => {
  try {
    console.log("createQR");
    //console.log(req.body.dataQR);
    if (!(await userModel.checkAdmin(req.body.dataQR.iduser)))
      return res.status(500).json({ message: "ban khong phai admin" });
    //tim  htx
    let idCoopare = await coopertationModel.findIdCoopera(
      req.body.dataQR.idcustomer
    );
    if (idCoopare) {
      let listFarmer = await farmerModel.showFarmer(idCoopare._id); //result array
      // chay data nong ho
      let arrayFarmer = listFarmer.map(async (e) => {
        //console.log(e.totalNumberQR);
        // let arrayQR = await setDataQR(e.totalNumberQR, idCoopare._id, e._id);
        // console.log(arrayQR);
        let arrayQR = [];
        for (let i = 1; i <= e.totalNumberQR; i++) {
          let ranDomPassWord = generator.generate({
            length: 5,
            numbers: true,
          });
          // let data = {
          //   dataQR: idCoopare._id + "." + e._id,
          //   code: ranDomPassWord,
          // };
          let data = {
            idCoopare: idCoopare._id,
            idFarmer: e._id,
            code: ranDomPassWord,
          };
          arrayQR.push(data);
        }
        // console.log(arrayQR);
        let dataDone = {
          idFarmer: e._id,
          arrayQR: arrayQR,
        };
        return dataDone;
      });
      //chuyen doi data thanh ma qr
      let convertArrayQR = await Promise.all(arrayFarmer);
      //  console.log(convertArrayQR);
      let converData = convertArrayQR.map(async (e) => {
        let arrayConvet = await e.arrayQR.map(async (ele) => {
          // console.log(ele);
          // gan token
          let tokenQR = await jwtHelper.generateTokenQR(
            ele,
            accessTokenSecretQr,
            accessTokenLifeQr
          );
          // chuyen thanh QR
          let convetQR = { qrId: await qrcode.toDataURL(tokenQR) };
          return convetQR;
        });
        let array = await Promise.all(arrayConvet);
        e.arrayQR = array;
        return e;
      });
      let converDataArray = await Promise.all(converData);
      // console.log(converDataArray);

      let dataDone = {
        idOrder: req.body.dataQR.idOrder,
        idCoopare: idCoopare._id,
        ListFarmerQR: converDataArray,
      };
      await qrCodeModel.createNew(dataDone);
      //  await orderModel.updateDefaulQR(req.body.dataQR.idOrder);
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(500).json({ message: "khong tim thay htx" });
    }
    //return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create QR failed" });
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
    let idCoopare = req.params.idcoopare;
    // console.log(idCoopare);
    let idFarmer = req.params.idfarmer;
    console.log(idFarmer);
    // let idCoopare = req.query.idcoopare;
    // let idFarmer = req.query.idfarmer;
    console.log(idCoopare);
    console.log(idFarmer);
    let dataCoopare = await coopertationModel.findCoopare(idCoopare);
    console.log(dataCoopare);
    let dataFarmer = await farmerModel.findFarmer(idFarmer);
    console.log(dataFarmer);
    let data = {
      dataCoopare: dataCoopare,
      dataFarmer: dataFarmer,
    };
    const arrayData = Object.values(data);
    return res.status(200).json(arrayData);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let searchProductQR = async (req, res) => {
  try {
    let dataQR = req.params.dataQR;
    console.log("decodeqr");
    const decoded = await jwtHelper.verifyToken(dataQR, accessTokenSecretQr);
    console.log(decoded);
    if (decoded) {
      let dataCoopare = await coopertationModel.findCoopare(
        decoded.data.idCoopare
      );
      // console.log(dataCoopare);
      let dataFarmer = await farmerModel.findFarmer(decoded.data.idFarmer);
      //console.log(dataFarmer);
      let data = {
        dataCoopare: dataCoopare,
        dataFarmer: dataFarmer,
      };
      const arrayData = Object.values(data);
      return res.status(200).json(arrayData);
    } else {
      return res.status(500).json({ message: "qr khong tồn tại" });
    }
    //return res.status(200).json(decoded);
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
  newCreateQR: newCreateQR,
  findInforProduct: findInforProduct,
  searchProduct: searchProduct,
  searchProductQR: searchProductQR,
};
