const userModel = require("../models/userModel");
const batchModel = require("../models/batchModel");
let createBatch = (data) => {
  return new Promise(async (resolve, reject) => {
    let batch = 0;
    let stumps = 0;
    // let checkTotalType = true;
    console.log("createBatch" + data.totalTrees);
    //  console.log("total trees" + typeof data.totalTrees);
    if (data.totalTrees > 250) {
      batch = parseInt(data.totalTrees / 250);
      // checkTotalType = false;
    } else {
      batch = 1;
    }
    if (batch === 1) {
      stumps = parseInt(data.totalTrees / 50); // lay phan nguyen
      let check = data.totalTrees % 50; // phan du
      let lasttotaltrees = 50; // so cay phan du
      if (check) {
        console.log("check true");
        lasttotaltrees = data.totalTrees - stumps * 50;
        stumps = stumps + 1; // cong pha ndu
        console.log(stumps + " + " + lasttotaltrees);
      }

      let array = [];
      for (let i = 1; i <= stumps; i++) {
        let ele = {
          numberStumps: i, // stt thưa đất
          totalTree: i === stumps ? lasttotaltrees : 50, // tổng số cây trong 1 lô
        };
        array.push(ele);
      }
      let item = {
        idFarmOwner: data._id, // chủ lô
        numberbatch: 1, // stt lô
        totalTree: data.totalTrees, // cay trong 1 lô
        totalStumps: stumps, // so thua
        stumps: array, // thửa đất
      };
      await batchModel.createNew(item);

      resolve({ message: "success" });
    } else {
      //   laststumps = (data.totalTrees - 250 * batch) / 50;
      let check = data.totalTrees % 250; // phan du
      let lastbatchtotaltrees = 250; // so cay phan du
      let lastbatchStumps = 5;
      if (check) {
        lastbatchtotaltrees = data.totalTrees - 250 * batch;
        lastbatchStumps =
          lastbatchtotaltrees % 50 ? parseInt(lastbatchtotaltrees / 50) + 1 : 5;
        batch = batch + 1;
        console.log(lastbatchtotaltrees + " + " + lastbatchStumps);
      }
      let array = [];
      for (let i = 1; i <= batch; i++) {
        let ele = {
          idFarmOwner: data._id, // chủ lô
          numberbatch: i, // stt lô
          totalTree: i === batch ? lastbatchtotaltrees : 250, // cay trong 1 lô
          totalStumps: i === batch ? lastbatchStumps : 5, // so thua
          stumps: createArray(i, batch, data.totalTrees),
        };
        array.push(ele);
      }

      array.forEach(async (e) => {
        await batchModel.createNew(e);
      });

      resolve({ message: "success" });
    }
  });
};
createArray = (i, batch, totaltrees) => {
  let array = [];
  // let laststumps = 0;
  //console.log(i + "+ " + batch + " function " + typeof totaltrees);
  if (i === batch) {
    let lastTotaltreesInbatch = totaltrees - parseInt(totaltrees / 250) * 250;
    let laststumps = parseInt(lastTotaltreesInbatch / 50);
    if (lastTotaltreesInbatch / 50 === 0) {
      laststumps = 5;
    }
    let check = lastTotaltreesInbatch % 50; // phan du
    let lasttotaltrees = 50; // so cay phan du
    if (check) {
      //  let lasttotaltreebatch = totaltrees - 250 * batch;
      // console.log(laststumps + " check " + lastTotaltreesInbatch);
      lasttotaltrees = lastTotaltreesInbatch - laststumps * 50;
      laststumps = laststumps + 1; // cong pha ndu
      console.log(lasttotaltrees + " + " + laststumps);
    }

    for (let j = 1; j <= laststumps; j++) {
      let ele = {
        numberStumps: j, // stt thưa đất
        totalTree: j === laststumps ? lasttotaltrees : 50, // tổng số cây trong 1 lô
      };
      array.push(ele);
    }
  } else {
    for (let j = 1; j <= 5; j++) {
      let ele = {
        numberStumps: j, // stt thưa đất
      };
      array.push(ele);
    }
  }
  return array;
};
module.exports = {
  createBatch: createBatch,
};
