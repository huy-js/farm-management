let generator = require("generate-password");
const userModel = require("../models/userModel");
let createPassWord = (data) => {
  return new Promise(async (resolve, reject) => {
    let ranDomPassWord = generator.generate({
      length: 5,
      numbers: true,
    });
    let createdata = {
      idFarmer: "",
      username: data.farmOwner,
      password: ranDomPassWord,
    };
    let updateUser = await userModel.updateFarmerArrayPW(
      data.idUser,
      createdata
    );
    if (updateUser) {
      return resolve(ranDomPassWord);
    }
    reject("error");
  });
};

module.exports = {
  createPassWord: createPassWord,
};
