const fse = require("fs-extra");
let xl = require("excel4node");
let wb = new xl.Workbook();
// Add Worksheets to the workbook
// Create a reusable style
var style = wb.createStyle({
  font: {
    color: "#FF0800",
    size: 12,
  },
  // numberFormat: "$#,##0.00; ($#,##0.00); -",
});

let createFileExcel = async (nameFile, listOrder, listQR) => {
  return new Promise(async (resolve, reject) => {
    console.log("alo create file multi");
    listQR.forEach((element) => {
      let nameFarmer = "";
      listOrder.forEach((ele) => {
        if (ele.idFarmer === element.idFarmer) {
          nameFarmer = ele.farmOwner;
        }
      });
      let countId = element.idFarmer.toString();
      let id5 = countId.substr(countId.length - 5);
      console.log(nameFile);
      let ws = wb.addWorksheet(`${nameFarmer + "_" + id5}`);
      ws.cell(1, 1).string(element.idFarmer).style(style);
      element.arrayQR.forEach((e, index) => {
        ws.cell(index + 2, 1)
          .string(e.qrId)
          .style(style);
      });
    });
    //  await wb.write(`./server/src/public/fileqr.xlsx`);
    await wb.write(
      `./server/src/public/${nameFile}.xlsx`,
      function (err, stats) {
        if (err) {
          console.error(err);
          reject(false);
        } else {
          console.log("write");
          resolve(true);
        }
      }
    );
  });
};
module.exports = {
  createFileExcel: createFileExcel,
};
