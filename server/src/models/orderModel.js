const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    idcustomer: { type: String },
    totalOR: { type: Number },
    memberfarmer: { type: Number },
    totalTrees: { type: Number }, // tông cay trong htx
    landArea: { type: Number }, // diện tích
    email: { type: String },
    totalpay: { type: Number },
    payments: { type: String },
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
  //   findByEmail(email) {
  //     return this.findOne({ email: email }).exec();
  //   },
  //   showListUser() {
  //     return this.find().exec();
  //   },
  //   findActiveById(id) {
  //     return this.findById(id, { isActive: 1, email: 1 }).exec();
  //   },
};

module.exports = mongoose.model("order", orderSchema);
