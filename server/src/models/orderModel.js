const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    idcustomer: { type: String },
    numberQR: { type: Number },
    memberfarmer: { type: Number },
    totalTrees: { type: Number }, // tông cay trong htx
    landArea: { type: Number }, // diện tích
    email: { type: String },
    totalpay: { type: Number },
    payments: { type: String },
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
};

module.exports = mongoose.model("order", orderSchema);
