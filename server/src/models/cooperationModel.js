const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let cooperationSchema = new Schema(
  {
    Owner: { type: String }, // chủ nông trại
    technicalStaff: { type: String, default: null }, // cán bộ kỹ thuật
    address: { type: String },
    landArea: { type: String }, // diện tích
    specializedfarming: { type: String, default: "Xoai" }, // chuyên canh
    soilType: { type: String }, // loại đất
    waterSource: { type: String }, // nguồn nước
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
  showCooperation() {
    return this.find().exec();
  },
};
module.exports = mongoose.model("cooperation", cooperationSchema);
