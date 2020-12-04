const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let diarySchema = new Schema(
  {
    work: { type: String }, //công việc
    detail: { type: String }, // nôi dung công việc
    idFarmer: { type: String }, // chủ lô
    // danh cho phun thuoc
    preparation: {
      thuoc: { type: String },
      soluong: { type: String },
      dungtich: { type: String },
      luongnuoc: { type: String },
      cachtri: { type: String },
    },
    files: [{ data: Buffer, contentType: String, fileName: String }],
    node: [
      {
        col: { type: String },
        row: { type: String },
        stt: { type: String },
      },
    ], // cây được áp dụng
    // createdAt: { type: Number, default: Date.now }, // ngày tạo
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
diarySchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  showImageDiary(idF) {
    return this.find({ idFarmer: idF }, { files: 1 }).exec();
  },
};
module.exports = mongoose.model("diary", diarySchema);
