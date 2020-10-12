let generator = require("generate-password");

let ranDomPassWord = generator.generate({
  length: 10,
  numbers: true,
});

module.exports = {
  ranDomPassWord: ranDomPassWord,
};
