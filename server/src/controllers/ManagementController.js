const userModel = require("../models/userModel");
const coopertationModel = require("../models/cooperationModel");
const farmerModel = require("../models/farmerModel");
const orderModel = require("../models/orderModel");
const qrCodeModel = require("../models/qrCodeModel");
const qrcode = require("qrcode");
const randomPW = require("../helpers/randomPW.helper");
const callCreateBatch = require("../helpers/createBatch.helper");
require("dotenv").config();
const fse = require("fs-extra");
const jwtHelper = require("../helpers/jwt.helper");

const generator = require("generate-password");

const bcrypt = require("bcrypt");
const saltRounds = 7;

const sendMail = require("../helpers/sendmail.helper");
const createExcel = require("../helpers/createExcel.helper");
const sendMailQR = require("../helpers/sendmailQR.helper");

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
    let idUser = data.idUser;
    let idCoopera = await coopertationModel.findIdCoopera(data.idUser);

    let getPassWord = await randomPW.createPassWord(data);
    let salt = bcrypt.genSaltSync(saltRounds); // tao muoi bam :))
    let password = bcrypt.hashSync(getPassWord, salt);

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
    let totalNumberQR = idCoopera.totalNumberQR + data.totalNumberQR;
    // goi await tai vi tri can truy van data
    // bac cac tuyen trinh doi truyen trinh nay song moi dc lam tuyen trinh khac
    let dataFarmer = await farmerModel.createNew(data); // createNew laf function dc tao trong file model
    //console.log("data famer " + dataFarmer);
    //console.log(idUser);
    await userModel.updateDatafarmer(
      idUser,
      dataFarmer.farmOwner,
      dataFarmer._id
    );
    //tao data batch lo thua
    await callCreateBatch.createBatch(dataFarmer);

    // update data htx dien tich va so nong ho
    await coopertationModel.updateLandAndTotalTree(
      idCoopera._id,
      totalarea,
      totaltree,
      totalNumberQR,
      idCoopera.memberfarmer + 1
    );

    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let updateDataFarmers = async (req, res) => {
  try {
    console.log("update data farmer");
    let data = req.body.dataFamer;
    console.log(data);
    console.log(data.idFarmer);
    let idCoopera = await coopertationModel.findIdCoopera(data.idUser);
    if (!idCoopera) {
      return res
        .status(500)
        .json({ message: "ban khong co thong tin trong htx" });
    }
    let dataFarmer = await farmerModel.findFarmer(data.idFarmer);
    if (!dataFarmer) {
      return res
        .status(500)
        .json({ message: "khong co nong dan nay trong htx" });
    }
    delete data["idFarmer"];
    delete data["idUser"];
    await farmerModel.updateDataFarmer(data, dataFarmer._id);

    //console.log(dataFarmer);
    // console.log(data);
    let totalarea = idCoopera.landArea - dataFarmer.landArea + data.landArea;
    //let totalNumberQR =
    //  idCoopera.totalNumberQR - dataFarmer.totalNumberQR + data.totalNumberQR;
    // update data htx dien tich va so nong ho
    await coopertationModel.updateLandAndTotalQR(
      idCoopera._id,
      totalarea
      // totalNumberQR
    );
    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};
let deleteFarmer = async (req, res) => {
  try {
    console.log(req.body.data);
    //console.log(await userModel.checkAdmin(req.body.data.iduser));
    let getdataUser = await coopertationModel.findIdCoopera(
      req.body.data.idUser
    );
    //console.log(getdataUser);
    if (!getdataUser) {
      return res
        .status(500)
        .json({ message: "ban khong co thong tin trong htx" });
    }
    let dataFarmer = await farmerModel.findFarmer(req.body.data.idFarmer);
    if (!dataFarmer) {
      return res
        .status(500)
        .json({ message: "khong co nong dan nay trong htx" });
    }
    //console.log(dataFarmer);
    await farmerModel.deleteFarmer(dataFarmer._id, !dataFarmer.deletedAt);
    return res.status(200).json({ message: "success update" });
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};
let showCooperaTion = async (req, res) => {
  try {
    console.log("show cooperative");
    let idUser = req.params.iduser;
    // check admin
    //  console.log(idUser);
    let arrayCoopera = await coopertationModel.getAllCooperative();
    let arrayConvert = await arrayCoopera.map(async (ele) => {
      ele = ele.toObject();
      let dataTechnical = await userModel.getDataUser(ele.technicalStaff);
      // console.log(data);
      ele.dataTechnical = dataTechnical;
      return ele;
    });
    let convertDataCoopera = await Promise.all(arrayConvert);
    console.log(convertDataCoopera);
    return res.status(200).json({ convertDataCoopera });
  } catch (error) {
    return res.status(500).json({ message: "get data farmer" });
  }
};

let showFarmer = async (req, res) => {
  try {
    console.log("show farmer");
    let idUser = req.params.id;
    //  console.log(idUser);
    let idCoopera = await coopertationModel.findIdCoopera(idUser);

    let getData = await farmerModel.showFarmer(idCoopera._id);
    //let salt = bcrypt.genSaltSync(saltRounds);
    //console.log(salt);
    //console.log(getData);
    //Không cần chỗ này
    // getData.map(async (e) => {
    //   let pw = await bcrypt.compareSync(e.password);
    //   console.log(pw);
    // });
    let dataArray = await userModel.getDataPwfarmer(idUser);
    //console.log(dataArray);
    return res
      .status(200)
      .json({ listFarmer: getData, listPWFarmer: dataArray.dataFarmer });
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
    console.log("tao order");
    // console.log(req.body.dataOrder);
    //  console.log(req.body.dataCreate);
    let dataSave = {
      idcustomer: req.body.dataCreate.idcustomer,
      numberQR: req.body.dataCreate.tongQR, // song qr yeu cau'
      memberfarmer: req.body.dataCreate.tongNongdan,
      email: req.body.dataCreate.email,
      inForQR: req.body.dataOrder,
    };
    //console.log(dataSave);
    await orderModel.createNew(dataSave);
    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let showListOrder = async (req, res) => {
  try {
    let dataListOrder = await orderModel.showListOrder();
    let dataresult = dataListOrder.map(async (e) => {
      e = e.toObject();
      let nameCoopera = await coopertationModel.getNameCoopera(e.idcustomer);
      // console.log(nameCoopera.nameOfCooperative);
      e.nameCooperaTion = nameCoopera.nameOfCooperative;
      return e;
    });
    let dataOrder = await Promise.all(dataresult);
    //console.log(dataOrder);
    return res.status(200).json(dataOrder);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};

let newCreateQR = async (req, res) => {
  try {
    console.log("createQR");
    // console.log(req.body.data);
    if (!(await userModel.checkAdmin(req.body.data.iduser)))
      return res.status(500).json({ message: "ban khong phai admin" });

    let dataOrder = await orderModel.showOrderCreate(req.body.data.dataQR);
    //  console.log(dataOrder);
    if (!dataOrder) {
      return res.status(500).json({ message: "Thong tin truy xuat ko hop le" });
    }
    //tim  htx
    let idCoopare = await coopertationModel.findIdCoopera(dataOrder.idcustomer);
    // console.log(idCoopare);
    if (idCoopare) {
      //console.log(idCoopare);
      // let listFarmer = await farmerModel.showFarmer(idCoopare._id); //result array
      // chay data nong ho
      let passTableQR = generator.generate({
        length: 4,
        numbers: true,
      });
      let arrayFarmer = dataOrder.inForQR.map(async (e) => {
        //console.log(e.totalNumberQR);
        // let arrayQR = await setDataQR(e.totalNumberQR, idCoopare._id, e._id);
        // console.log(arrayQR);
        let arrayQR = [];
        for (let i = 1; i <= e.numberQR; i++) {
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
            idFarmer: e.idFarmer,
            code: ranDomPassWord,
            passTable: passTableQR,
          };
          arrayQR.push(data);
        }
        // console.log(arrayQR);
        let dataDone = {
          idFarmer: e.idFarmer,
          arrayQR: arrayQR,
        };
        return dataDone;
      });
      //chuyen doi data thanh ma qr
      let convertArrayQR = await Promise.all(arrayFarmer);
      //console.log(convertArrayQR);
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
          let convetQR = {
            qrId: await qrcode.toDataURL(tokenQR),
            code: ele.code,
          };
          // console.log("qr" + tokenQR);
          return convetQR;
        });
        let array = await Promise.all(arrayConvet);
        e.arrayQR = array;
        return e;
      });
      let converDataArray = await Promise.all(converData);
      //    console.log("adadsad" + converDataArray);

      //tao ten file
      // console.log(dataOrder._id);
      let countId = dataOrder._id.toString();
      let nameFile = countId.substr(countId.length - 5);
      //   console.log(nameFile);
      // taoj bang list qr check sp
      let dataDone = {
        idOrder: req.body.data.dataQR,
        idCoopare: idCoopare._id,
        ListFarmerQR: converDataArray,
      };
      let dataQRCreate = await qrCodeModel.createNew(dataDone);

      await orderModel.updateDefaulQR(req.body.data.dataQR);

      let result = await createExcel.createFileExcel(
        nameFile,
        dataOrder.inForQR,
        dataQRCreate.ListFarmerQR
      );
      //let email = "huuphat98s@gmail.com";

      console.log("buf say");

      let buf = fse.readFileSync(`./server/src/public/${nameFile}.xlsx`);
      console.log(result);
      //console.log(buf);
      sendMailQR(dataOrder.email, buf)
        .then((success) => {
          console.log("alo success");
          return success;
        })
        .catch(async (error) => {
          console.log("nononono");
          return error;
        });

      return res.status(200).json({ message: "success" });
    } else {
      return res.status(500).json({ message: "khong tim thay htx" });
    }

    // tesst send mail
    console.log("alo send");
    let dataFakeFarmer = [
      {
        idFarmer: 1,
        farmOwner: "nd1",
        numberQR: 2,
      },
      {
        idFarmer: 2,
        farmOwner: "nd2",
        numberQR: 3,
      },
    ];
    let dataFake = [
      {
        idFarmer: 1,
        arrayQR: [{ qrId: "1q" }, { qrId: "2q" }],
      },
      {
        idFarmer: 2,
        arrayQR: [{ qrId: "3q" }, { qrId: "4q" }, { qrId: "5q" }],
      },
    ];
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
    console.log("scanner QR");
    const decoded = await jwtHelper.verifyToken(dataQR, accessTokenSecretQr);
    console.log(decoded);
    if (decoded) {
      let dataCoopare = await coopertationModel.findCoopare(
        decoded.data.idCoopare
      );
      // console.log(dataCoopare);
      let dataFarmer = await farmerModel.findFarmer(decoded.data.idFarmer);

      let tableQRcode = await qrCodeModel.findData(
        decoded.data.idCoopare,
        decoded.data.idFarmer,
        decoded.data.code
      );
      let checkSold = null;
      tableQRcode.ListFarmerQR.forEach((e) => {
        if (e.idFarmer === decoded.data.idFarmer) {
          e.arrayQR.forEach((eles) => {
            if (eles.code == decoded.data.code) {
              checkSold = eles.sold;
            }
          });
        }
      });
      //console.log(checkSold);
      let data = {
        dataCoopare: dataCoopare,
        dataFarmer: dataFarmer,
        checkSold: checkSold,
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
// let getDataPWFarmer = async (req, res) => {
//   try {
//     console.log("alo");
//     let iduser = req.params.id;
//     console.log(iduser);
//     let dataArray = await userModel.getDataPwfarmer(iduser);
//     console.log(dataArray);
//     return res.status(200).json(dataArray.dataFarmer);
//   } catch (error) {
//     return res.status(500).json({ message: "create failed" });
//   }
// };
let updateQrSold = async (req, res) => {
  try {
    let dataQR = req.body.data;
    console.log("updateQRarray");

    let dataArray = dataQR.map(async (ele) => {
      const decoded = await jwtHelper.verifyToken(ele, accessTokenSecretQr);
      if (decoded) {
        //console.log(decoded);
        return decoded.data;
      }
    });
    let arrayDecoded = await Promise.all(dataArray);
    //console.log(arrayDecoded);
    let arrayUpdate = [];
    for (let i = 0; i < arrayDecoded.length; i++) {
      let check = true;
      if (arrayUpdate.length !== 0) {
        arrayUpdate.forEach((e) => {
          if (
            e.idFarmer === arrayDecoded[i].idFarmer &&
            e.passTable === arrayDecoded[i].passTable
          ) {
            check = false;
          }
        });
      }
      if (!check) continue;
      let code = [];
      for (let j = i; j < arrayDecoded.length; j++) {
        if (
          arrayDecoded[i].idFarmer === arrayDecoded[j].idFarmer &&
          arrayDecoded[i].passTable === arrayDecoded[j].passTable
        ) {
          code.push(arrayDecoded[j].code);
        }
      }
      arrayUpdate.push({
        idCoopare: arrayDecoded[i].idCoopare,
        idFarmer: arrayDecoded[i].idFarmer,
        code: code,
        passTable: arrayDecoded[i].passTable,
      });
    }
    console.log(arrayUpdate);

    arrayUpdate.map(async (ele) => {
      let tableQRcode = await qrCodeModel.findData(
        ele.idCoopare,
        ele.idFarmer,
        ele.code[0]
      );
      let arrayQRUpdate = [];
      let ListFarmerQrIdArray = null;
      tableQRcode.ListFarmerQR.map((e) => {
        if (e.idFarmer === ele.idFarmer) {
          ListFarmerQrIdArray = e._id;
          let arrayUpdate = e.arrayQR.map((eles) => {
            ele.code.forEach((element) => {
              if (element === eles.code) {
                eles.sold = true;
              }
            });
            return eles;
          });
          return (arrayQRUpdate = arrayUpdate);
        }
        if (arrayQRUpdate.length !== 0) return;
      });
      //console.log(arrayQRUpdate);
      await qrCodeModel.updatePushdataQrSold(
        tableQRcode._id,
        ListFarmerQrIdArray,
        arrayQRUpdate
      );
      //console.log(updates);
    });

    // const lookup = arrayDecoded.reduce((a, e) => {
    //   a[e.idFarmer] = ++a[e.idFarmer] || 0;
    //   return a;
    // }, {});
    //console.log(lookup);
    // console.log(arrayDecoded.filter((e) => lookup[e.idFarmer]));
    //array duplicate
    //let arrayduplicate = arrayDecoded.filter((e) => lookup[e.idFarmer]);
    //array !duplucate
    //console.log(arrayDecoded.filter((e) => !lookup[e.idFarmer]));
    //let arraydifer = arrayDecoded.filter((e) => !lookup[e.idFarmer]);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "update false" });
  }
};
let showBusiness = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    let idCoopera = await coopertationModel.findIdCoopera(id);
    return res.status(200).json(idCoopera.business);
  } catch (error) {
    return res.status(500).json({ message: "get company failed" });
  }
};
let createCompany = async (req, res) => {
  try {
    //console.log(req.body.dataFamer);
    let data = req.body.dataFamer;
    //let idUser = data.idUser;
    let idCoopera = await coopertationModel.findIdCoopera(data.idUser);
    delete data["idUser"];
    console.log(data);
    await coopertationModel.updateBusiness(idCoopera._id, data);

    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let deleteBusiness = async (req, res) => {
  try {
    //console.log(req.body.data);
    //console.log(await userModel.checkAdmin(req.body.data.iduser));
    let getdataUser = await coopertationModel.findIdCoopera(
      req.body.data.iduser
    );
    if (!getdataUser) {
      return res
        .status(500)
        .json({ message: "ban khong co thong tin trong htx" });
    }
    //console.log(getdataUser);
    await coopertationModel.deleteBusiness(getdataUser._id, req.body.data.id);
    return res.status(200).json({ message: "success update" });
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};

module.exports = {
  showListUser: showListUser,
  updateActiveUser: updateActiveUser,
  createPwAndSendMail: createPwAndSendMail,
  createFarmer: createFarmer,
  showCooperaTion: showCooperaTion,
  showFarmer: showFarmer,
  showCooperation: showCooperation,
  createDataOrder: createDataOrder,
  showListOrder: showListOrder,
  // createListQR: createListQR,
  newCreateQR: newCreateQR,
  updateQrSold: updateQrSold,
  findInforProduct: findInforProduct,
  searchProduct: searchProduct,
  searchProductQR: searchProductQR,
  // getDataPWFarmer: getDataPWFarmer,
  showBusiness: showBusiness,
  createCompany: createCompany,
  deleteBusiness: deleteBusiness,
  updateDataFarmer: updateDataFarmers,
  deleteFarmer: deleteFarmer,
};
