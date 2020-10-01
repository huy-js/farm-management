const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let detailByBatchSchema = new Schema(
  {
    idFarmOwner: { type: String, default: null }, // chủ lô
    batch: { type: Number }, // lô
    stumps: [
      {
        number: { type: Number }, // stt thưa đất
        totalTree: { type: Number, default: 0 }, // tổng số cây trong 1 lô
        arrayDiary: [{ idDiary: { type: String } }],
        // diary: [
        //   {
        //     title: { type: String },
        //     content: { type: String },
        //     forTheTree: { type: String, default: "all" },
        //     createdAt: { type: Number, default: Date.now },
        //   },
        // ],
      },
    ], // thửa đất
    totalTree: { type: Number, default: 0 }, // cay trong 1 lô
    landAreaBatch: { type: String }, // diện tích 1 lô
    deletedAt: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
detailByBatchSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  showDetailByBatchSchema() {
    return this.find().exec();
  },
};
module.exports = mongoose.model("detaiByBatch", detailByBatchSchema);
