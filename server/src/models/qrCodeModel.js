const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const qrCodeSchema = new Schema(
  {
    idOrder: { type: String },
    // arrayQR: [{ qrId: String }],
    ActiveOrder: { type: Boolean, default: false },
    deletedAt: { type: Boolean, default: false },
    idCoopare: { type: String },
    ListFarmerQR: [
      {
        idFarmer: { type: String },
        arrayQR: [{ qrId: String }],
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
qrCodeSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  showListQR() {
    return this.find().exec();
  },
};

module.exports = mongoose.model("qrCode", qrCodeSchema);
