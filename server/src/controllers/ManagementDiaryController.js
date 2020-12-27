const userModel = require("../models/userModel");
const coopertationModel = require("../models/cooperationModel");
const farmerModel = require("../models/farmerModel");
const orderModel = require("../models/orderModel");
const qrCodeModel = require("../models/qrCodeModel");
const qrDiaryModel = require("../models/qrDiaryModel");
const batchModel = require("../models/batchModel");
const diaryModel = require("../models/diaryModel");
const seasonDiaryModel = require("../models/seasonDiaryModel");
const qrcode = require("qrcode");
const moment = require("moment");
// const fs = require("fs");
// const { get } = require("http");
var lodash = require("lodash");
const { element } = require("prop-types");
let getDataFarmerProfile = async (req, res) => {
  try {
    let idFarmer = req.params.id;
    console.log(idFarmer);
    let dataProfile = await farmerModel.findFarmer(idFarmer);
    console.log(dataProfile);
    let dataCoopera = await coopertationModel.findCoopare(
      dataProfile.CooperativeId
    );
    dataProfile = dataProfile.toObject();
    dataProfile.nameCooperaTion = dataCoopera.nameOfCooperative;
    return res.status(200).json(dataProfile);
  } catch (error) {
    return res.status(500).json({ message: "get data profile farmer" });
  }
};
let showListFarmer = async (req, res) => {
  try {
    let idUser = req.params.id;
    let Limit = req.params.limit;
    console.log(idUser + " + " + Limit);
    let idCoopera = await coopertationModel.findIdCoopera(idUser);

    let getData = await farmerModel.showListFarmer(idCoopera._id, +Limit);

    // console.log(getData);

    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json({ message: "get data farmer" });
  }
};

let showListBatch = async (req, res) => {
  try {
    let idUser = req.params.id;

    let getData = await batchModel.showListBatch(idUser);
    // data diary mat do cay trong
    console.log("showListBatch");
    let getDataDiaryOfCoopera = await diaryModel.getDataOfFarmer(idUser);
    console.log(getDataDiaryOfCoopera);

    return res
      .status(200)
      .json({ getData: getData, getDataDiaryOfCoopera: getDataDiaryOfCoopera });
  } catch (error) {
    return res.status(500).json({ message: "get data batch error" });
  }
};

let updateMapBatch = async (req, res) => {
  try {
    //console.log(req.body.data);
    // console.log(req.body.data.selectedOption);
    let getDatabach = await batchModel.getDataBatch(
      req.body.data.idFarmer,
      req.body.data.selectedOption
    );
    // console.log(getDatabach);
    if (req.body.data.stumpTotalTree !== null) {
      //  console.log("alo");
      let stumpTotalTree = +req.body.data.stumpTotalTree;
      let datastump = getDatabach.stumps.filter((ele) => {
        if (req.body.data.selectedStumps === ele.numberStumps) {
          return ele;
        }
      });
      // console.log(datastump[0].totalTree);
      // update total tree batch and stump at batchmodel
      await batchModel.updateStumps(
        getDatabach._id,
        getDatabach.totalTree - datastump[0].totalTree + stumpTotalTree,
        stumpTotalTree,
        req.body.data.selectedStumps
      );
      let findCooper = await coopertationModel.findIdCoopera(
        req.body.data.iduser
      );
      // console.log(findCooper);
      //update at cooparemodel
      await coopertationModel.updateTotaltree(
        findCooper._id,
        findCooper.totalTrees - datastump[0].totalTree + stumpTotalTree
      );
      // update farmer total tree
      //update at farmermodel totaltree
      let dataFarmfer = await farmerModel.findFarmer(req.body.data.idFarmer);
      await farmerModel.updateTotaltree(
        dataFarmfer._id,
        dataFarmfer.totalTrees - datastump[0].totalTree + stumpTotalTree
      );
    }
    //update row and col
    if (req.body.data.row !== null) {
      await batchModel.updateMatrixMap(
        getDatabach._id,
        req.body.data.selectedStumps,
        req.body.data.row,
        "editrow"
      );
    }
    if (req.body.data.col !== null) {
      await batchModel.updateMatrixMap(
        getDatabach._id,
        req.body.data.selectedStumps,
        req.body.data.col,
        "editcol"
      );
    }
    let getBatchDataFarmer = await batchModel.showListBatch(
      req.body.data.idFarmer
    );
    return res.status(200).json(getBatchDataFarmer);
  } catch (error) {
    return res.status(500).json({ message: "get data batch error" });
  }
};
let updateBatchCountStump = async (req, res) => {
  try {
    console.log(req.body.data);
    // console.log(req.body.data.selectedOption);
    let getDatabach = await batchModel.getDataBatch(
      req.body.data.idFarmer,
      req.body.data.selectedOption
    );
    console.log(getDatabach);
    let lengthStumps = getDatabach.stumps.length;
    console.log(lengthStumps);
    let totaltressCount = +req.body.data.stumpTotalTree;
    let dataStump = {
      numberStumps: lengthStumps + 1,
      totalTree: totaltressCount,
      row: req.body.data.row,
      col: req.body.data.col,
    };
    // update batch total at batch mmodel
    await batchModel.updateTotalTreeBatch(
      getDatabach._id,
      getDatabach.totalTree + totaltressCount
    );
    //update stump array
    await batchModel.updateBatchStumps(getDatabach._id, dataStump);
    // cap nhat so cay htx
    let findCooper = await coopertationModel.findIdCoopera(
      req.body.data.iduser
    );
    // console.log(findCooper);
    //update coopare total
    await coopertationModel.updateTotaltree(
      findCooper._id,
      findCooper.totalTrees + totaltressCount
    );
    //update at farmermodel totaltree
    let dataFarmfer = await farmerModel.findFarmer(req.body.data.idFarmer);
    await farmerModel.updateTotaltree(
      dataFarmfer._id,
      dataFarmfer.totalTrees + totaltressCount
    );

    let getBatchDataFarmer = await batchModel.showListBatch(
      req.body.data.idFarmer
    );
    return res.status(200).json(getBatchDataFarmer);
  } catch (error) {
    return res.status(500).json({ message: "get data batch error" });
  }
};

let deleteStump = async (req, res) => {
  try {
    console.log(req.body.data);
    //xoa stump
    await batchModel.deleteStump(
      req.body.data.idFarmer,
      req.body.data.selectedOption,
      req.body.data.selectedStumps
    );
    let getDatabach = await batchModel.getDataBatch(
      req.body.data.idFarmer,
      req.body.data.selectedOption
    );
    // update batch total at batch mmodel
    let totaltreedelete = +req.body.data.totalTree;
    await batchModel.updateTotalTreeBatch(
      getDatabach._id,
      getDatabach.totalTree - totaltreedelete
    );
    let findCooper = await coopertationModel.findIdCoopera(
      req.body.data.iduser
    );
    //update coopare total
    await coopertationModel.updateTotaltree(
      findCooper._id,
      findCooper.totalTrees - totaltreedelete
    );
    //update at farmermodel totaltree
    let dataFarmfer = await farmerModel.findFarmer(req.body.data.idFarmer);
    await farmerModel.updateTotaltree(
      dataFarmfer._id,
      dataFarmfer.totalTrees - totaltreedelete
    );

    let getBatchDataFarmer = await batchModel.showListBatch(
      req.body.data.idFarmer
    );
    return res.status(200).json(getBatchDataFarmer);
  } catch (error) {
    return res.status(500).json({ message: "delete stump error" });
  }
};
let conFromMap = async (req, res) => {
  try {
    //console.log(req.body.data);
    let idfarmer = req.body.data.idFarmer;
    let dataBatch = await batchModel.findBatchFarmer(req.body.data.idFarmer);
    //console.log(dataBatch);
    let number = 0;
    // array = [];
    let settingvalue = dataBatch.map(async (e, index) => {
      number = number + 1;
      let settingstump = e.stumps.map(async (ele) => {
        let data = {
          idQR: await qrcode.toDataURL(
            idfarmer + "." + e._id + "." + ele.numberStumps
          ),
        };
        return data;
      });
      let deCodeQR = await Promise.all(settingstump);
      let result = {
        idFarmOwner: idfarmer,
        totalbatch: number,
        batchs: {
          numberbatch: index + 1,
          arrayQR: deCodeQR,
        },
      };
      return result;
    });
    let createDataMap = await Promise.all(settingvalue);
    // console.log(settingvalue);
    // settingvalue.forEach((element) => {
    //   console.log(element.batchs);
    // });
    await qrDiaryModel.createNew(createDataMap);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "confrom map error" });
  }
};
let checkMap = async (req, res) => {
  try {
    console.log("check map " + req.body.data);
    //let idfarmer = req.body.data.idFarmer;
    let checkactive = await qrDiaryModel.checkactiveMap(req.body.data);
    console.log("check " + checkactive);
    let result = false;
    if (checkactive === null) {
      result = false;
    } else {
      result = checkactive.active;
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "confrom map error" });
  }
};
let getMapFarmer = async (req, res) => {
  try {
    let idFarmer = req.params.idfarmer;
    console.log(idFarmer);
    let dataMap = await batchModel.showListBatch(idFarmer);
    console.log(dataMap);
    return res.status(200).json(dataMap);
  } catch (error) {
    return res.status(500).json({ message: "confrom map error" });
  }
};
let writeDiary = async (req, res) => {
  try {
    console.log(req.body.datadiary);
    //console.log(req.body.files);
    // for (var i = 0; i < req.files.length; i++) {
    //   console.log(req.files[i]);
    // }
    let fileImage = req.files.map((e) => {
      let datafile = {
        data: e.buffer,
        contentType: e.mimetype,
        fileName: e.originalname,
      };
      return datafile;
    });
    // console.log("array file");
    // console.log(fileImage);
    //console.log(req.file);
    let dataconver = JSON.parse(req.body.datadiary);
    let datadiary = dataconver.data;
    //console.log(datadiary);
    // console.log(req.file.path);
    // let fileImage = {
    //   data: req.file.buffer,
    //   contentType: req.file.mimetype,
    //   fileName: req.file.originalname,
    // };
    // console.log(file);
    let data = {
      work: datadiary.work, //công việc
      preparation: datadiary.deTailVal, // nôi dung công việc
      //  ferTiLizer: datadiary.ferTiLizer, // loai phan bon'
      // worm: datadiary.sau,
      node: datadiary.arrayChecked,
      idFarmer: datadiary.isFarmer,
      files: fileImage,
    };
    if (datadiary.work === "bonphan") {
      data.ferTiLizer = datadiary.ferTiLizer;
    }
    if (datadiary.work === "sauhai") {
      data.worm = datadiary.sau;
    }
    console.log(data);
    //return;
    let createData = await diaryModel.createNew(data);

    if (datadiary.title === "allbatch") {
      console.log("alo" + createData.idFarmer + " + " + createData._id);
      await batchModel.updateAllBatchDiary(datadiary.isFarmer, createData._id);
    }
    if (datadiary.title == "allStumpinBatch") {
      console.log("is batch " + datadiary.isBatch);
      let dataBatch = await batchModel.findBatch(datadiary.isBatch);
      console.log("is batch " + dataBatch);
      dataBatch.stumps.map(async (e) => {
        await batchModel.updateStumpsBatchDiary(
          // dataBatch._id,
          e._id,
          createData._id
        );
      });
    }
    if (datadiary.title == "Stumps") {
      console.log("is array stumps " + datadiary.arrayStumps);
      let dataBatch = await batchModel.findBatch(datadiary.isBatch);
      let arrayCheckStump = [];
      datadiary.arrayStumps.forEach((e) => {
        dataBatch.stumps.forEach((ele) => {
          if (e.numberStumps === ele.numberStumps) {
            arrayCheckStump.push(ele);
          }
        });
      });
      console.log(arrayCheckStump);
      arrayCheckStump.map(async (e) => {
        await batchModel.updateStumpsBatchDiary(e._id, createData._id);
      });
    }
    if (datadiary.title == "detailStump") {
      console.log("is array detailStump " + datadiary.isStump);
      let dataBatch = await batchModel.findBatch(datadiary.isBatch);
      console.log(dataBatch);
      let Stumpis = dataBatch.stumps.filter((ele) => {
        if (datadiary.isStump == ele.numberStumps) {
          return ele;
        }
      });
      console.log(Stumpis);
      await batchModel.updateStumpsBatchDiary(Stumpis[0]._id, createData._id);
    }
    return res.status(200).json({ message: "create diary success" });
  } catch (error) {
    return res.status(500).json({ message: "confrom map error" });
  }
};
let showImageDiaryFarmer = async (req, res) => {
  try {
    let idFarmer = req.params.id;
    console.log(idFarmer);
    let dataImage = await diaryModel.showImageDiary(idFarmer);
    //console.log(dataImage);
    return res.status(200).json(dataImage);
  } catch (error) {
    return res.status(500).json({ message: "confrom map error" });
  }
};
let getDataDiary = async (req, res) => {
  try {
    ///console.log(req.body.data);
    let isStump = +req.body.data.isStump;
    //console.log(isStump + " type " + typeof isStump);
    let getDataBatch = await batchModel.findBatch(req.body.data.isBatch);
    //console.log(getDataBatch.arrayDiaryForAll);
    let dataDiaryBatch = getDataBatch.arrayDiaryForAll.map(async (e) => {
      let getDiary = await diaryModel.getData(e.idDiary);
      return getDiary;
    });
    //dataallbatch
    let diaryDataFirst = await Promise.all(dataDiaryBatch);
    //console.log(diaryDataFirst);

    let dataStump = getDataBatch.stumps.filter((ele) => {
      return ele.numberStumps === isStump;
    });
    //console.log(dataStump[0].arrayDiary);
    let dataDiaryInStump = dataStump[0].arrayDiary.map(async (e) => {
      let getDiary = await diaryModel.getDataInStump(e.idDiary);
      if (getDiary.node.length !== 0) {
        //  console.log("length");
        let check = false;
        getDiary.node.forEach((ele) => {
          if (
            +ele.row === req.body.data.Row &&
            +ele.col === req.body.data.Col
          ) {
            check = true;
          }
        });
        if (!check) return;
      }
      return getDiary;
    });
    //dataallbatch
    let diaryData2nd = await Promise.all(dataDiaryInStump);
    diaryData2nd = diaryData2nd.filter((e) => {
      return e !== undefined;
    });
    //console.log(diaryData2nd);
    let dataDiarySendClient = diaryDataFirst.concat(diaryData2nd);
    dataDiarySendClient = lodash.sortBy(dataDiarySendClient, (item) => {
      // let result = Instant.parse(item.updateAt).toEpochMilli();
      // console.log(result);
      // return -result; // sx tu cao den thap theo date
      return -item.updateAt;
    });
    //console.log(dataDiarySendClient);
    return res.status(200).json(dataDiarySendClient);
  } catch (error) {
    return res.status(500).json({ message: "get diary error" });
  }
};
let getDiaryFarmer = async (req, res) => {
  try {
    let data = req.body.data;
    let dataFarmer = await diaryModel.getDataOfFarmer(data.idfarmer);
    // console.log(dataFarmer);

    let array = dataFarmer.filter((ele) => {
      // ele = ele.toObject();
      let month = ele.updateAt.getUTCMonth() + 1; //months from 1-12
      // let day = ele.updateAt.getUTCDate();
      let year = ele.updateAt.getUTCFullYear();
      date = month + "/" + year;
      if (date == data.date) {
        //  console.log(year + "/" + month + "/" + day);
        //  ele.dayCreate = year + "/" + month + "/" + day;
        return ele;
      }
    });
    console.log("show diary list");
    console.log(array);
    return res.status(200).json(array);
  } catch (error) {
    return res.status(500).json({ message: "get diary farmer" });
  }
};
let getBatchStump = async (req, res) => {
  try {
    let data = req.body.data;
    console.log("show node");
    console.log(data.nodeStay);
    let dataBatchStump = await batchModel.getBatchStump(
      data.idDiary,
      data.idFarmer
    );
    //console.log(dataBatchStump);
    console.log("stump " + data.idDiary);
    let dataStump = await batchModel.getdataStump(data.idDiary, data.idFarmer);
    //  console.log(dataStump);
    console.log("end");
    let datas = dataBatchStump.concat(dataStump);
    // console.log(datas);
    let dataSendClient = [];
    datas.forEach((e) => {
      e.arrayDiaryForAll.forEach((ele) => {
        if (data.idDiary === ele.idDiary) {
          let ob = {
            batch: e.numberbatch,
            stump: "all",
            stay: "all",
          };
          dataSendClient.push(ob);
        }
      });
      e.stumps.forEach((ele) => {
        ele.arrayDiary.forEach((eles) => {
          if (eles.idDiary === data.idDiary) {
            if (data.nodeStay.length === 0) {
              let ob = {
                batch: e.numberbatch,
                stump: ele.numberStumps,
                stay: "all",
              };
              dataSendClient.push(ob);
            } else {
              let ob = {
                batch: e.numberbatch,
                stump: ele.numberStumps,
                stay: "notAll",
              };
              dataSendClient.push(ob);
            }
          }
        });
      });
    });
    console.log(dataSendClient);
    return res.status(200).json(dataSendClient);
  } catch (error) {
    return res.status(500).json({ message: "get diary farmer" });
  }
};

let deleteDiaryByFarmer = async (req, res) => {
  try {
    let data = req.body.data;
    console.log("deleteDiary");
    console.log(data);
    let dataBatchStump = await batchModel.getBatchStump(
      data.idDiary,
      data.idFarmer
    );

    // console.log(dataBatchStump);
    if (dataBatchStump.length !== 0) {
      dataBatchStump.map(async (element) => {
        await batchModel.deleteIdDiaryAllBatch(element._id, data.idDiary);
      });

      // let dataBatch = dataBatchStump[0];

      // await batchModel.deleteIdDiaryAllBatch(dataBatch._id, data.idDiary);
      console.log("ok 1");
    }

    let dataStump = await batchModel.getdataStump(data.idDiary, data.idFarmer);
    if (dataStump.length !== 0) {
      dataStump.map(async (element) => {
        element.stumps.map(async (ele) => {
          ele.arrayDiary.map(async (e) => {
            if (e.idDiary === data.idDiary) {
              let newArray = ele.arrayDiary.filter((es) => {
                return es.idDiary !== data.idDiary;
              });
              console.log(newArray);
              await batchModel.deleteIdDiaryIsStump(
                element._id,
                ele.numberStumps,
                newArray
              );
            }
          });
        });
      });
      console.log("ok 2");
    }
    await diaryModel.deleteDataDiary(data.idDiary);
    return res.status(200).json("");
  } catch (error) {
    return res.status(500).json({ message: "delete failed" });
  }
};
let createSeason = async (req, res) => {
  try {
    let data = req.body.dataCreate;
    console.log("create season");
    console.log(data);

    const giaidoan = [
      {
        date: { from: 7, to: 10 },
        screen: "bonphan",
      },
      {
        date: { from: 30, to: 35 },
        screen: "phunthuoc",
      },
      {
        date: { from: 30, to: 45 },
        screen: "Baotrai",
      },
      {
        date: { from: 45, to: 50 },
        screen: "bonphan",
      },
      {
        date: { from: 45, to: 50 },
        screen: "phunthuoc",
      },
      {
        date: { from: 60, to: 65 },
        screen: "bonphan",
      },
      {
        date: { from: 70, to: 80 },
        screen: "phunthuoc",
      },
    ];

    let arrayListTasks = giaidoan.map((e) => {
      let dateFrom = moment(data.datecreate, "YYYY-MM-DD")
        .add(e.date.from, "days")
        .format("YYYY-MM-DD");
      let dateTo = moment(data.datecreate, "YYYY-MM-DD")
        .add(e.date.to, "days")
        .format("YYYY-MM-DD");
      return {
        dateFrom: dateFrom,
        dateTo: dateTo,
        w: e.screen,
      };
    });
    //console.log(arrayListTasks);

    let dataCreate = {
      startSeason: data.startSeason, // moi them
      idFarmer: data.iduser, // chủ lô
      createDay: data.datecreate,
      listTasks: arrayListTasks,
    };
    await seasonDiaryModel.createNew(dataCreate);
    return res.status(200).json({ message: "create season diary success" });
  } catch (error) {
    return res.status(500).json({ message: "create season diary failed" });
  }
};
let checkNotification = async (req, res) => {
  try {
    console.log("check notifi");

    let startDate = "2020-12-01";
    // let newD = moment(startDate, 'YYYY-MM-DD');
    // newD.add(10, 'days');

    const giaodoan = [
      {
        //  date: { from: 7, to: 10 },
        dateFrom: moment(startDate, "YYYY-MM-DD")
          .add(7, "days")
          .format("YYYY-MM-DD"),
        dateTo: moment(startDate, "YYYY-MM-DD")
          .add(10, "days")
          .format("YYYY-MM-DD"),
        screen: "bonphan",
      },
      {
        //date: { from: 30, to: 35 },
        dateFrom: moment(startDate, "YYYY-MM-DD")
          .add(30, "days")
          .format("YYYY-MM-DD"),
        dateTo: moment(startDate, "YYYY-MM-DD")
          .add(35, "days")
          .format("YYYY-MM-DD"),
        screen: "phunthuoc",
      },
      {
        // date: { from: 30, to: 45 },
        dateFrom: moment(startDate, "YYYY-MM-DD")
          .add(30, "days")
          .format("YYYY-MM-DD"),
        dateTo: moment(startDate, "YYYY-MM-DD")
          .add(45, "days")
          .format("YYYY-MM-DD"),
        screen: "Baotrai",
      },
      {
        //date: { from: 45, to: 50 },
        dateFrom: moment(startDate, "YYYY-MM-DD")
          .add(45, "days")
          .format("YYYY-MM-DD"),
        dateTo: moment(startDate, "YYYY-MM-DD")
          .add(50, "days")
          .format("YYYY-MM-DD"),
        screen: "bonphan",
      },
      {
        //date: { from: 45, to: 50 },
        dateFrom: moment(startDate, "YYYY-MM-DD")
          .add(45, "days")
          .format("YYYY-MM-DD"),
        dateTo: moment(startDate, "YYYY-MM-DD")
          .add(50, "days")
          .format("YYYY-MM-DD"),
        screen: "phunthuoc",
      },
      {
        // date: { from: 60, to: 65 },
        dateFrom: moment(startDate, "YYYY-MM-DD")
          .add(60, "days")
          .format("YYYY-MM-DD"),
        dateTo: moment(startDate, "YYYY-MM-DD")
          .add(65, "days")
          .format("YYYY-MM-DD"),
        screen: "bonphan",
      },
      {
        //   date: { from: 70, to: 80 },
        dateFrom: moment(startDate, "YYYY-MM-DD")
          .add(70, "days")
          .format("YYYY-MM-DD"),
        dateTo: moment(startDate, "YYYY-MM-DD")
          .add(80, "days")
          .format("YYYY-MM-DD"),
        screen: "phunthuoc",
      },
    ];

    let idFarmer = req.params.idfarmer;
    // console.log(idFarmer);
    let dataSeason = await seasonDiaryModel.getDataseason(idFarmer);
    //   console.log(dataSeason);
    //let array = [];
    // let dataArray = [];
    // let dataArray = giaodoan.map(async (e) => {
    //   console.log(e);
    //   // let check = false;
    //   let date = await diaryModel.getCheckTime(
    //     idFarmer,
    //     e.screen,
    //     new Date(e.dateFrom).getTime(),
    //     new Date(e.dateTo).getTime()
    //   );
    //   if (date !== null) {
    //     console.log(date);
    //     return {
    //       work: e.screen,
    //       bool: true,
    //     };
    //   } else {
    //     return {
    //       work: e.screen,
    //       bool: false,
    //     };
    //   }
    //   // dataArray = array;
    // });
    dataSeason.listTasks.forEach(async (e) => {
      //console.log(e);
      let date = await diaryModel.getCheckTime(
        dataSeason.idFarmer,
        e.w,
        new Date(e.dateFrom).getTime(),
        new Date(e.dateTo).getTime()
      );
      // console.log(dataSeason.idFarmer);
      //console.log(e.w);
      if (date !== null) {
        console.log(date);
        await seasonDiaryModel.updateNodtifi(dataSeason._id, e._id);
        // return {
        //   work: e.screen,
        //   bool: true,
        // };
      } else {
        let datelast = await diaryModel.getCheckTimelast(
          dataSeason.idFarmer,
          e.w,
          new Date(e.dateTo).getTime()
        );
        if (datelast !== null) {
          await seasonDiaryModel.updateNodtifiLast(dataSeason._id, e._id);
        }
      }
      // else {
      // return {
      //   work: e.screen,
      //   bool: false,
      // };
      // }
    });
    // let dataUpdate = await seasonDiaryModel.getDataseason(idFarmer);
    //  let DataCheckNotifi = await Promise.all(dataArray);
    console.log("check alo");
    //console.log(dataUpdate);
    return res.status(200).json({ message: "notifi check ok" });
  } catch (error) {
    return res.status(500).json({ message: "notifi check failed" });
  }
};
let getDataseason = async (req, res) => {
  try {
    console.log("get notifi");
    let idFarmer = req.params.idfarmer;
    // console.log(idFarmer);
    let dataSeason = await seasonDiaryModel.getDataseason(idFarmer);

    console.log("check alo");
    //console.log(dataUpdate);
    return res.status(200).json(dataSeason);
  } catch (error) {
    return res.status(500).json({ message: "notifi check failed" });
  }
};
let updateEndSeason = async (req, res) => {
  try {
    console.log("get update season");
    let idseason = req.body.data;
    // console.log(idFarmer);
    await seasonDiaryModel.updateEndSeason(idseason);

    console.log("check alo");
    //console.log(dataUpdate);
    return res.status(200).json({ message: "update season thanh cong" });
  } catch (error) {
    return res.status(500).json({ message: "update season failed" });
  }
};
module.exports = {
  getDataFarmerProfile: getDataFarmerProfile,
  showListFarmer: showListFarmer,
  showListBatch: showListBatch,
  updateMapBatch: updateMapBatch,
  updateBatchCountStump: updateBatchCountStump,
  deleteStump: deleteStump,
  conFromMap: conFromMap,
  checkMap: checkMap,
  getMapFarmer: getMapFarmer,
  writeDiary: writeDiary,
  showImageDiaryFarmer: showImageDiaryFarmer,
  getDataDiary: getDataDiary,
  getDiaryFarmer: getDiaryFarmer,
  getBatchStump: getBatchStump,
  deleteDiaryByFarmer: deleteDiaryByFarmer,
  checkNotification: checkNotification,
  createSeason: createSeason,
  getDataseason: getDataseason,
  updateEndSeason: updateEndSeason,
};
