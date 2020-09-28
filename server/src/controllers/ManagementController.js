const farmer = require("../models/farmerModel");
const cooperation = require("../models/cooperationModel");

let createFarmer = async (req, res) => {
  try {
    console.log(req.body.datacreate);
    await farmer.createNew(req.body.datacreate);
    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let showFarmer = async (req, res) => {
  try {
    let dataFarmer = await farmer.showFarmer();
    return res.status(200).json(dataFarmer);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
// admin
let createCooperation = async (req, res) => {
  try {
    console.log(req.body.datacreate);
    await cooperation.createNew(req.body.datacreate);
    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let showCooperation = async (req, res) => {
  try {
    console.log("tai controller");

    let dataCooperation = await cooperation.showCooperation();
    return res.status(200).json(dataCooperation);
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
module.exports = {
  createFarmer: createFarmer,
  showFarmer: showFarmer,
  createCooperation: createCooperation,
  showCooperation: showCooperation,
};
