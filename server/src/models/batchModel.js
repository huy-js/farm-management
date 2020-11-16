const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let BatchSchema = new Schema(
  {
    idFarmOwner: { type: String, default: null }, // chủ lô
    numberbatch: { type: Number }, // stt lô
    totalTree: { type: Number, default: 250 }, // cay trong 1 lô
    totalStumps: { type: Number, default: 5 }, // so thua
    stumps: [
      {
        numberStumps: { type: Number }, // stt thưa đất
        totalTree: { type: Number, default: 50 }, // tổng số cây trong 1 lô
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
  // showBatchSchema() {
  //   return this.find().exec();
  // },
};
module.exports = mongoose.model("batch", BatchSchema);
