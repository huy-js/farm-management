const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let cooperationSchema = new Schema(
  {
    Owner: { type: String, default: "" }, // chủ nông trại
    phoneOwner: { type: String, default: "" },
    nameOfCooperative: { type: String },
    technicalStaff: { type: String, default: null }, // cán bộ kỹ thuật
    address: { type: String },
    // numberQR: { type: Number }, //so qr
    // totalNumberQR: { type: Number, default: 0 },
    taxCode: { type: Number }, //ma thue
    landArea: { type: Number, default: 0 }, // diện tích
    totalTrees: { type: Number, default: 0 }, // tông cay trong htx
    memberfarmer: { type: Number, default: 0 }, // sô lượng nông hộ
    deletedAt: { type: Boolean, default: false },
    //moi them hien thi nha phan phoi
    business: [
      {
        nameCompany: String,
        createdAT: { type: Number, default: Date.now },
        typeOfTree: String,
        address: String,
      },
    ],
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
  removeById(iduser) {
    return this.findOneAndRemove({ technicalStaff: iduser }).exec();
  },
  showCooperation(idUser) {
    return this.findOne({ technicalStaff: idUser }).exec();
  },
  findCooperative(tax) {
    return this.findOne({ taxCode: tax }).exec();
  },
  findIdCoopera(iduser) {
    return this.findOne({ technicalStaff: iduser }).exec();
  },
  updateLandAndTotalTree(id, landarea, treetotal, farmermember) {
    return this.findByIdAndUpdate(id, {
      landArea: landarea,
      totalTrees: treetotal,
      // totalNumberQR: totalNumberQR,
      memberfarmer: farmermember,
    }).exec();
  },
  updateLandAndTotalQR(id, landarea) {
    return this.findByIdAndUpdate(id, {
      landArea: landarea,
      // totalNumberQR: totalNumberQR,
    }).exec();
  },
  findCoopare(idCoopare) {
    return this.findById(idCoopare).exec();
  },
  getNameCoopera(iduser) {
    return this.findOne(
      { technicalStaff: iduser },
      { nameOfCooperative: 1 }
    ).exec();
  },
  updateTotaltree(id, totaltree) {
    return this.findByIdAndUpdate(id, { totalTrees: totaltree }).exec();
  },
  updateBusiness(idCoopare, businessData) {
    return this.updateMany(
      { _id: idCoopare },
      {
        $push: {
          business: {
            $each: [businessData],
          },
        },
      }
    ).exec();
  },
  getAllCooperative() {
    return this.find().exec();
  },
  deleteBusiness(idCoopare, id) {
    return this.update(
      { _id: idCoopare },
      {
        $pull: { business: { _id: id } },
      }
    ).exec();
  },
};
module.exports = mongoose.model("cooperation", cooperationSchema);
