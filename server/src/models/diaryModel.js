const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let diarySchema = new Schema(
  {
    title: { type: String }, //công việc
    content: { type: String }, // nôi dung công việc
    forTheTree: { type: String, default: "all" }, // cây được áp dụng
    createdAt: { type: Number, default: Date.now }, // ngày tạo
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
  showDiary() {
    return this.find().exec();
  },
};
module.exports = mongoose.model("diary", diarySchema);
