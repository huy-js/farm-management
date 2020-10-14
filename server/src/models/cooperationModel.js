const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let cooperationSchema = new Schema(
  {
    Owner: { type: String,default: "" }, // chủ nông trại
    phoneOwner: { type: String,default: "" },
    nameOfCooperative: { type: String },
    technicalStaff: { type: String, default: null }, // cán bộ kỹ thuật
    address: { type: String },
    numberQR: { type: Number },
    taxCode: { type: Number },
    // landArea: { type: String }, // diện tích
    // specializedfarming: { type: String, default: "Xoai" }, // chuyên canh
    // soilType: { type: String }, // loại đất
    // waterSource: { type: String }, // nguồn nước
    memberfarmer: { type: Number, default: 0 }, // sô lượng nông hộ
    deletedAt: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
cooperationSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  removeById(iduser){
    return this.findOneAndRemove({technicalStaff:iduser}).exec();
  },
  showCooperation() {
    return this.find().exec();
  },
  findCooperative(tax) {
    return this.findOne({ taxCode: tax }).exec();
  },
  findIdCoopera(iduser) {
    return this.findOne({ technicalStaff: iduser },{technicalStaff:1}).exec();
  },
};
module.exports = mongoose.model("cooperation", cooperationSchema);
