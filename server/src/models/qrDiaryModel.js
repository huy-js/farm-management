const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let qrDiarySchema = new Schema(
  {
    idFarmOwner: { type: String, default: null }, // nong ho
    totalbatch: { type: Number, default: 5 }, // tong lo
    stumps: [
      {
        numberbatch: { type: Number }, // stt thưa đất
        arrayQR: [{ idQR: { type: String } }], // id nhat ky
      },
    ], // thửa đất
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
  //   showqrDiary() {
  //     return this.find().exec();
  //   },
};
module.exports = mongoose.model("qrDiary", qrDiarySchema);
