const mongoose = require("mongoose");

let Schema = mongoose.Schema;
// tao gia tri co ban
let farmerSchema = new Schema(
  {
    farmOwner: { type: String }, // chủ nông trại
    address: { type: String },
    landArea: { type: Number }, // diện tích
    typeOfTree: { type: String }, // giống cây
    totalTrees: { type: Number },
    CooperativeId: { type: String },
    totalNumberQR: { type: Number, default: 0 },
    password: { type: String, default: "" },
    deletedAt: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
// goi cac function co trong thu vien
farmerSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  showFarmer(id) {
    return this.find({ CooperativeId: id }, { password: 0 }).exec();
  },
  findFarmer(idFarmer) {
    return this.findById(idFarmer).exec();
  },
  showListFarmer(id, limit) {
    return this.find({ CooperativeId: id }, { password: 0 })
      .sort({ createdAt: 1 })
      .limit(limit)
      .exec();
  },
};

module.exports = mongoose.model("farmer", farmerSchema);
