var FileSaver = require("file-saver");
var xlsx = require("xlsx");
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
    console.log(dataQrDiary);
    dataQrDiary.forEach((element, index) => {
      // let ws = wb.addWorksheet(`${"qrDiary" + "_" + index}`);
      let ws = wb.addWorksheet(`${element.nameFarmer}`);
      // ws.cell(index + 1, index + 1)
      //   .string(element.nameFarmer)
      //   .style(style);

      let stay = 0;
      element.batchs.forEach((ele, inde) => {
        let stays = stay + inde;
        ws.cell(stays + 2, 1)
          .string("LÔ " + ele.numberbatch)
          .style(style);

        ele.arrayQR.forEach((e, inx) => {
          let thua = inx + 1;
          ws.cell(stays + 2, inx + 2)
            .string("Thửa " + thua)
            .style(style);
          ws.cell(stays + 3, inx + 2)
            .string(e.idQR)
            .style(style);
        });

        stay++;
      });
    });

    // for (let i = 0; i < dataQrDiary.length; i++) {
    //   let ws = wb.addWorksheet(`${dataQrDiary[i].nameFarmer}`);
    //   let stays = 0;
    //   for (let j = 0; j < dataQrDiary[i].batchs.length; j++) {
    //     let numberlo = +dataQrDiary[i].batchs[j].numberbatch + 1;
    //     ws.cell(stays + 2, 1)
    //       .string("LÔ " + numberlo)
    //       .style(style);
    //     for (let k = 0; k < dataQrDiary[i].batchs[j].arrayQR.length; k++) {
    //       let thua = k + 1;
    //       ws.cell(stays + 2, k + 2)
    //         .string("Thửa " + thua)
    //         .style(style);
    //       ws.cell(stays + 3, k + 2)
    //         .string(dataQrDiary[i].batchs[j].arrayQR[k].idQR)
    //         .style(style);
    //     }
    //     stays++;
    //   }
    // }

    await wb.write(`./server/src/public/diaryqr/fileqrdiary.xlsx`);
    await wb
      .writeToBuffer(`./server/src/public/diaryqr/fileqrdiary.xlsx`)
      .then(function (buffer) {
        //const xlsxFileBuffer = Buffer.from(buffer);
        resolve(buffer);
      });
    // wb.write(
    //   "./server/src/public/diaryqr/fileqrdiary.xlsx",
    //   function (err, stats) {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       // console.log(stats); // Prints out an instance of a node.js fs.Stats object
    //       resolve(true);
    //     }
    //   }
    // );
  });
};
module.exports = {
  createFileExcelQrDiary: createFileExcelQrDiary,
};
