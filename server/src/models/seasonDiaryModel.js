const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let seasonDiarySchema = new Schema(
  {
    idFarmer: { type: String }, // chủ lô
    startSeason: {
      toggleXiecNuoc: { type: Boolean, default: false },
      toggleGaySoc: { type: Boolean, default: false },
      toggleNhietDo: { type: Boolean, default: false },
      toggleCatCanh: { type: Boolean, default: false },
      toggleTiaCanh: { type: Boolean, default: false },
      togglePaclo: { type: Boolean, default: false },
      toggleBondam: { type: Boolean, default: false },
    },
    createDay: { type: String },
    deletedAt: { type: Boolean, default: false },
    listTasks: [
      {
        dateFrom: { type: String },
        dateTo: { type: String },
        w: { type: String },
        bool: { type: Boolean, default: false },
        late: { type: Boolean, default: false },
      },
    ],
    endSeason: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
seasonDiarySchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  getDataseason(idfarmer) {
    return this.findOne({ idFarmer: idfarmer }).exec();
  },
  updateNodtifi(dataSeasonid, tastid) {
    return this.findOneAndUpdate(
      { $and: [{ _id: dataSeasonid }, { "listTasks._id": tastid }] },
      {
        $set: { "listTasks.$.bool": true },
      }
    ).exec();
  },
  updateNodtifiLast(dataSeasonid, tastid) {
    return this.findOneAndUpdate(
      { $and: [{ _id: dataSeasonid }, { "listTasks._id": tastid }] },
      {
        $set: { "listTasks.$.bool": true, "listTasks.$.late": true },
      }
    ).exec();
  },
};

module.exports = mongoose.model("seasonDiary", seasonDiarySchema);
