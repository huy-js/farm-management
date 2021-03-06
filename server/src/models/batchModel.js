const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let BatchSchema = new Schema(
  {
    idFarmOwner: { type: String, default: null }, // chủ lô
    numberbatch: { type: Number }, // stt lô
    totalTree: { type: Number, default: 250 }, // cay trong 1 lô
    totalStumps: { type: Number, default: 5 }, // so thua
    arrayDiaryForAll: [{ idDiary: { type: String } }], // id nhat ky all
    stumps: [
      {
        numberStumps: { type: Number }, // stt thưa đất
        totalTree: { type: Number, default: 50 }, // tổng số cây trong 1 lô
        row: { type: Number, default: 10 },
        col: { type: Number, default: 5 },
        arrayDiary: [{ idDiary: { type: String } }], // id nhat ky
      },
    ], // thửa đất
    deletedAt: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
BatchSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  showListBatch(id) {
    return this.find({ idFarmOwner: id }).sort({ numberbatch: 1 }).exec();
  },
  getDataBatch(iduser, numberbatch) {
    return this.findOne({
      $and: [{ idFarmOwner: iduser }, { numberbatch: numberbatch }],
    }).exec();
  },
  updateStumps(idBatch, totaltreeinBatch, totalstump, numberstump) {
    return this.findOneAndUpdate(
      { $and: [{ _id: idBatch }, { "stumps.numberStumps": numberstump }] },
      {
        $set: { totalTree: totaltreeinBatch, "stumps.$.totalTree": totalstump },
      }
    ).exec();
  },
  updateMatrixMap(idBatch, selectedStumps, numberEdit, checkDefault) {
    if (checkDefault === "editrow") {
      return this.findOneAndUpdate(
        { $and: [{ _id: idBatch }, { "stumps.numberStumps": selectedStumps }] },
        {
          $set: { "stumps.$.row": numberEdit },
        }
      ).exec();
    }
    if (checkDefault === "editcol") {
      return this.findOneAndUpdate(
        { $and: [{ _id: idBatch }, { "stumps.numberStumps": selectedStumps }] },
        {
          $set: { "stumps.$.col": numberEdit },
        }
      ).exec();
    }
  },
  updateTotalTreeBatch(idBatch, totaltree) {
    return this.findByIdAndUpdate(idBatch, { totalTree: totaltree }).exec();
  },
  updateBatchStumps(idBatch, data) {
    return this.findByIdAndUpdate(idBatch, {
      $push: {
        stumps: {
          $each: [data],
        },
      },
    }).exec();
  },
  deleteStump(idBatch, batch, stump) {
    return this.update(
      { $and: [{ idFarmOwner: idBatch }, { numberbatch: batch }] },
      {
        $pull: { stumps: { numberStumps: stump } },
      }
    ).exec();
  },
  findBatchFarmer(idFarmer) {
    return this.find({ idFarmOwner: idFarmer }).exec();
  },
  updateAllBatchDiary(idFarmer, iddiary) {
    return this.updateMany(
      { idFarmOwner: idFarmer },
      {
        $push: {
          arrayDiaryForAll: {
            $each: [{ idDiary: iddiary }],
          },
        },
      }
    ).exec();
  },
  findBatch(idBatch) {
    return this.findById(idBatch).exec();
  },
  updateStumpsBatchDiary(idStump, iddiary) {
    return this.findOneAndUpdate(
      { stumps: { $elemMatch: { _id: idStump } } },
      {
        $push: {
          "stumps.$.arrayDiary": {
            idDiary: iddiary,
          },
        },
      }
      //  { safe: true, upsert: true, new: true }
    ).exec();
  },
  updateOneBatch(idBatch, idDiary) {
    return this.findByIdAndUpdate(idBatch, {
      $push: {
        arrayDiaryForAll: {
          idDiary: idDiary,
        },
      },
    });
  },
  // getDataIdDiaryAllStump(idBatch) {
  //   return this.findById(idBatch, { arrayDiaryForAll: 1 }).exec();
  // },
  getBatchStump(iddiary, idFarmer) {
    return this.find({
      $and: [
        { idFarmOwner: idFarmer },
        { arrayDiaryForAll: { $elemMatch: { idDiary: iddiary } } },
      ],
    }).exec();
  },
  getdataStump(iddiary, idFarmer) {
    return this.find({
      $and: [
        { idFarmOwner: idFarmer },
        { "stumps.arrayDiary.idDiary": iddiary },
      ],
    }).exec();
  },
  deleteIdDiaryAllBatch(idbatch, iddiary) {
    return this.findByIdAndUpdate(idbatch, {
      $pull: { arrayDiaryForAll: { idDiary: iddiary } },
    }).exec();
  },
  // deleteIdDiaryIsStump(idbatch, iddiary) {
  //   return this.updateMany(
  //     { _id: idbatch },
  //     {
  //       $pull: { stumps: { arrayDiary: { idDiary: { $in: [iddiary] } } } },
  //     }
  //   ).exec();
  // },
  deleteIdDiaryIsStump(idbatch, numberStump, arrayIdDiaryNew) {
    return this.updateOne(
      {
        $and: [
          { _id: idbatch },
          { stumps: { $elemMatch: { numberStumps: numberStump } } },
        ],
      },
      {
        $set: {
          "stumps.$.arrayDiary": arrayIdDiaryNew,
        },
      }
      // { safe: true, upsert: true, new: true }
    ).exec();
  },
};
module.exports = mongoose.model("batch", BatchSchema);

// {
//   stumps: {
//     arrayDiary: { $elemMatch: { idDiary: iddiary } },
//   },
// },
