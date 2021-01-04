const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const qrCodeSchema = new Schema(
  {
    idOrder: { type: String },
    // arrayQR: [{ qrId: String }],
    //ActiveOrder: { type: Boolean, default: false },
    deletedAt: { type: Boolean, default: false },
    idCoopare: { type: String },
    ListFarmerQR: [
      {
        idFarmer: { type: String },
        arrayQR: [
          {
            qrId: { type: String },
            sold: { type: Boolean, default: false },
            code: { type: String },
          },
        ],
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
qrCodeSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  showListQR() {
    return this.find().exec();
  },
  // updateQRSold(idtableQR, idListFamer, idArrayQRSold, code) {
  //   return this.updateMany(
  //     {
  //       $and: [
  //         { _id: idtableQR },
  //         { "ListFarmerQR._id": idListFamer },
  //         { "ListFarmerQR.arrayQR.code": code },
  //       ],
  //     },
  //     {
  //       $set: {
  //         "ListFarmerQR.arrayQR.$*.sold": true,
  //       },
  //     }
  //   ).exec();
  // },
  // updatePushdataQrSold(idtableQR, idListFamer, setData) {
  //   return this.findOneAndUpdate(
  //     {
  //       $and: [
  //         { _id: idtableQR },
  //         { ListFarmerQR: { $elemMatch: { _id: idListFamer } } },
  //       ],
  //     },
  //     {
  //       $push: {
  //         "ListFarmerQR.$.arrayQR": setData,
  //       },
  //     }
  //     //  { safe: true, upsert: true, new: true }
  //   ).exec();
  // },
  // updateDeleteArrayQr(idtableQR, idListFamer, idArrayQRSold) {
  //   return this.findOneAndUpdate(
  //     {
  //       $and: [
  //         { _id: idtableQR },
  //         { ListFarmerQR: { $elemMatch: { _id: idListFamer } } },
  //       ],
  //     },
  //     {
  //       $pull: {
  //         ListFarmerQR: { arrayQR: { $elemMatch: { _id: idArrayQRSold } } },
  //       },
  //     }
  //   ).exec();
  // },
  findData(idCoopare, idFarmer, code) {
    return this.findOne(
      {
        $and: [
          { idCoopare: idCoopare },
          {
            "ListFarmerQR.idFarmer": idFarmer,
          },
          {
            "ListFarmerQR.arrayQR.code": code,
          },
        ],
      },
      { ListFarmerQR: 1 }
    ).exec();
  },
  updatePushdataQrSold(idtableQR, idListFamer, arrayQRUpdate) {
    return this.updateOne(
      {
        $and: [
          { _id: idtableQR },
          { ListFarmerQR: { $elemMatch: { _id: idListFamer } } },
        ],
      },
      {
        $set: {
          "ListFarmerQR.$.arrayQR": arrayQRUpdate,
        },
      }
      // { safe: true, upsert: true, new: true }
    ).exec();
  },
};

module.exports = mongoose.model("qrCode", qrCodeSchema);

// {
//   $match: {
//     ListFarmerQR: {
//       $elemMatch: {
//         $and: [
//           { idFarmer: idFarmer },
//           { arrayQR: { $elemMatch: { qrId: qr } } },
//         ],
//       },
//     },
//   },
// },
