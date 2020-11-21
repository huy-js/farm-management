const userModel = require("../models/userModel");
const coopertationModel = require("../models/cooperationModel");
const farmerModel = require("../models/farmerModel");
const orderModel = require("../models/orderModel");
const qrCodeModel = require("../models/qrCodeModel");
const batchModel = require("../models/batchModel");
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
    console.log(req.body.data);
    // console.log(req.body.data.selectedOption);
    let getDatabach = await batchModel.getDataBatch(
      req.body.data.idFarmer,
      req.body.data.selectedOption
    );
    console.log(getDatabach);
    if (req.body.data.stumpTotalTree !== null) {
      //  console.log("alo");
      let stumpTotalTree = +req.body.data.stumpTotalTree;
      let datastump = getDatabach.stumps.filter((ele) => {
        if (req.body.data.selectedStumps === ele.numberStumps) {
          return ele;
        }
      });
      // console.log(datastump[0].totalTree);
      // update total tree batch and stump
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
      await coopertationModel.updateTotaltree(
        findCooper._id,
        findCooper.totalTrees - datastump[0].totalTree + stumpTotalTree
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

    await batchModel.updateTotalTreeBatch(
      getDatabach._id,
      getDatabach.totalTree + totaltressCount
    );
    await batchModel.updateBatchStumps(getDatabach._id, dataStump);
    // cap nhat so cay htx
    let findCooper = await coopertationModel.findIdCoopera(
      req.body.data.iduser
    );
    // console.log(findCooper);
    await coopertationModel.updateTotaltree(
      findCooper._id,
      findCooper.totalTrees + totaltressCount
    );

    let getBatchDataFarmer = await batchModel.showListBatch(
      req.body.data.idFarmer
    );
    return res.status(200).json(getBatchDataFarmer);
  } catch (error) {
    return res.status(500).json({ message: "get data batch error" });
  }
};
module.exports = {
  showListFarmer: showListFarmer,
  showListBatch: showListBatch,
  updateMapBatch: updateMapBatch,
  updateBatchCountStump: updateBatchCountStump,
};
