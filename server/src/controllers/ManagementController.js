const userModel = require("../models/userModel");
const coopertationModel = require("../models/cooperationModel")
const farmerModel = require("../models/farmerModel");
const farmer = require("../models/farmerModel");
const cooperation = require("../models/cooperationModel");

const generator = require("generate-password");

const bcrypt = require("bcrypt");
const saltRounds = 7;

const sendMail = require("../helpers/sendmail.helper")
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
     sendMail(dataUser.email,ranDomPassWord)
     .then(success => {
          
          return success
     })
     .catch(async (error)=>{
         // remove user
         // xoa user dang ky
         await userModel.removeById(dataUser._id);
         // xoa htx 
         await coopertationModel.removeById(dataUser._id);
      
       return error
     })

    return res.status(200).json({ message: "success update",passwork:ranDomPassWord });
  } catch (error) {
    return res.status(500).json({ message: "update failed" });
  }
};

let createFarmer = async (req, res) => {
  try {
    //console.log(req.body.data);
    let data = req.body.data
    let ranDomPassWord = generator.generate({
      length: 5,
      numbers: true, 
    });
    //console.log(ranDomPassWord);
    let salt = bcrypt.genSaltSync(saltRounds); // tao muoi bam :))
    let password = bcrypt.hashSync(ranDomPassWord, salt);

    let idCoopera = await coopertationModel.findIdCoopera(data.idUser);
    if(idCoopera)
    {
      delete data['idUser']
      data.password = password
      data.CooperativeId = idCoopera._id
    }
    else{
      return res.status(500).json({ message: "khong tim thay htx lien quan" })
    }
  
    console.log(data);
    //console.log(req.body.data)
    // goi await tai vi tri can truy van data
    // bac cac tuyen trinh doi truyen trinh nay song moi dc lam tuyen trinh khac
   await farmerModel.createNew(data); // createNew laf function dc tao trong file model
    return res.status(200).json({ message: "create succession." });
  } catch (error) {
    return res.status(500).json({ message: "create failed" });
  }
};
let showFarmer = async (req, res) => {
  try {
    let idUser = req.params.id;

    let idCoopera = await coopertationModel.findIdCoopera(idUser);

    let getData = await farmerModel.showFarmer(idCoopera._id);
      getData.map( async (e)=>{
        let pw = await bcrypt.compareSync(e.password)
        console.log(pw )
      })
    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json({ message: "get data farmer" });
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
  showListUser: showListUser,
  updateActiveUser: updateActiveUser,
  createPwAndSendMail: createPwAndSendMail,
  createFarmer: createFarmer,
  showFarmer: showFarmer,

  createCooperation: createCooperation,
  showCooperation: showCooperation,
};
