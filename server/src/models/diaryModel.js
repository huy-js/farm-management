const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let diarySchema = new Schema(
  {
    work: { type: String }, //công việc
    detail: { type: String }, // nôi dung công việc
    idFarmer: { type: String }, // chủ lô
    // danh cho phun thuoc
    preparation: [
      {
        thuoc: { type: String },
        soluong: { type: String },
        dungtich: { type: String },
        luongnuoc: { type: String },
        loai: { type: String },
      },
    ],
    ferTiLizer: { type: String }, //phan bo'
    // wormType: { type: String },
    // theCure: { type: String },
    worm: {
      type: { type: String }, // ten sau
      theCure: { type: String }, // cach tri
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
  getData(id) {
    return this.findById(id).exec();
  },
  getDataInStump(id) {
    //let data = this.findById(id).exec();
    // if (data.node.length !== 0) {
    //   return this.find({
    //     $and: [
    //       { _id: id },
    //       {
    //         $and: [
    //           { node: { $elemMatch: { row: row } } },
    //           { node: { $elemMatch: { col: col } } },
    //         ],
    //       },
    //     ],
    //   }).exec();
    // }
    return this.findById(id).exec();
  },
  getDataOfFarmer(idFarmer) {
    return this.find({ idFarmer: idFarmer }).exec();
  },
  deleteDataDiary(idDiary) {
    return this.remove({ _id: idDiary }).exec();
  },
};
module.exports = mongoose.model("diary", diarySchema);
