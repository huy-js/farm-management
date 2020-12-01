const userModel = require("../models/userModel");
const coopertationModel = require("../models/cooperationModel");
const farmerModel = require("../models/farmerModel");
const orderModel = require("../models/orderModel");
const qrCodeModel = require("../models/qrCodeModel");
const qrDiaryModel = require("../models/qrDiaryModel");
const batchModel = require("../models/batchModel");
const diaryModel = require("../models/diaryModel");
const qrcode = require("qrcode");
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

    // console.log(getData);

    return res.status(200).json(getData);
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
    let datadiary = req.body.datadiary;
    let data = {
      work: datadiary.work, //công việc
      preparation: datadiary.deTailVal, // nôi dung công việc
      node: datadiary.arrayChecked,
      idFarmer: datadiary.isFarmer,
    };
    let createData = await diaryModel.createNew(data);

    if (datadiary.title == "allbatch") {
      console.log("alo" + createData.idFarmer + " + " + createData._id);
      await batchModel.updateAllBatchDiary(createData.idFarmer, createData._id);
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

    // return res.status(200).json(dataMap);
  } catch (error) {
    return res.status(500).json({ message: "confrom map error" });
  }
};
module.exports = {
  showListFarmer: showListFarmer,
  showListBatch: showListBatch,
  updateMapBatch: updateMapBatch,
  updateBatchCountStump: updateBatchCountStump,
  deleteStump: deleteStump,
  conFromMap: conFromMap,
  checkMap: checkMap,
  getMapFarmer: getMapFarmer,
  writeDiary: writeDiary,
};
