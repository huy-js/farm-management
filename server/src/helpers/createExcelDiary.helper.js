var FileSaver = require("file-saver");
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

let createFileExcelQrDiary = async (dataQrDiary) => {
  return new Promise(async (resolve, reject) => {
    console.log("alo create file multi");
    dataQrDiary.forEach((element, index) => {
      let ws = wb.addWorksheet(`${"qrDiary" + "_" + index}`);
      ws.cell(index + 1, index + 1)
        .string(element.idFarmOwner)
        .style(style);

      let stay = 0;
      element.batchs.forEach((ele, inde) => {
        let stays = stay + inde;
        ws.cell(stays + 2, 1)
          .string("Lo " + ele.numberbatch)
          .style(style);

        ele.arrayQR.forEach((e, inx) => {
          let thua = inx + 1;
          ws.cell(stays + 2, inx + 2)
            .string("thua " + thua)
            .style(style);
          ws.cell(stays + 3, inx + 2)
            .string(e.idQR)
            .style(style);
        });

        stay++;
      });
    });
    //await wb.write(`./server/src/public/diaryqr/fileqrdiary.xlsx`);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // const excelBuffer = await wb.write(
    //   `./server/src/public/diaryqr/fileqrdiary.xlsx`
    // );
    //  const data = new Blob([excelBuffer], { type: fileType });
    // FileSaver.saveAs(data, "qrDiary" + fileExtension);
    //   await wb.write(`./server/src/public/fileqr.xlsx`);
    await wb.write(
      `./server/src/public/diaryqr/fileqrdiary.xlsx`,
      function (err, stats) {
        if (err) {
          console.error(err);
          reject(false);
        } else {
          console.log("write");
          excelBuffer = fse.readFile(
            "./server/src/public/diaryqr/fileqrdiary.xlsx"
          );
          // const data = new Blob([excelBuffer], { type: fileType });
          // FileSaver.saveAs(data, "qrDiary" + fileExtension);
          resolve(excelBuffer);
        }
      }
    );
    //return true;
  });
};
module.exports = {
  createFileExcelQrDiary: createFileExcelQrDiary,
};
