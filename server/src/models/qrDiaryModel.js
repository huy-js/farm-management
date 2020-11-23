const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let qrDiarySchema = new Schema(
  {
    idFarmOwner: { type: String, default: null }, // nong ho
    totalbatch: { type: Number }, // tong lo
    batchs: [
      {
        numberbatch: { type: Number }, // stt thưa đất
        arrayQR: [{ idQR: { type: String } }], // id nhat ky
      },
    ], // thửa đất
    active: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
qrDiarySchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  checkactiveMap(idfarmer) {
    return this.findOne({
      $and: [{ idFarmOwner: idfarmer }, { active: true }],
    }).exec();
  },
};
module.exports = mongoose.model("qrDiary", qrDiarySchema);
