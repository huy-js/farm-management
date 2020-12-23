const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    idcustomer: { type: String },
    numberQR: { type: Number }, // song qr yeu cau'
    memberfarmer: { type: Number },
    email: { type: String },
    //totalpay: { type: Number },
    inForQR: [
      {
        farmOwner: { type: String },
        idFarmer: { type: String },
        numberQR: { type: Number },
      },
    ],
    createQR: { type: Boolean, default: false },
    deletedAt: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
orderSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  showListOrder() {
    return this.find().exec();
  },
  showOrderCreate(idOrder) {
    return this.findById(idOrder).exec();
  },
  showdataOrder(id) {
    return this.find({ idcustomer: id }).exec();
  },
  updateDefaulQR(id) {
    return this.findByIdAndUpdate(id, { createQR: true }).exec();
  },
};

module.exports = mongoose.model("order", orderSchema);
