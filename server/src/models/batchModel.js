const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let BatchSchema = new Schema(
  {
    idFarmOwner: { type: String, default: null }, // chủ lô
    numberbatch: { type: Number }, // stt lô
    totalTree: { type: Number, default: 250 }, // cay trong 1 lô
    totalStumps: { type: Number, default: 5 }, // so thua
    arrayDiary: [{ idDiary: { type: String } }], // id nhat ky all
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
    return this.find({ idFarmOwner: id }).exec();
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
};
module.exports = mongoose.model("batch", BatchSchema);
