const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String, default: "" },
    verifyToken: { type: String },
    // profile: {
    //   fullName: { type: String, default: "" },
    //   avatar: { type: String, default: "" },
    //   gender: { type: String, default: "" },
    //   address: { type: String, default: "" },
    // },
    dataFarmer: [
      {
        idFarmer: { type: String },
        keyLogin: { type: String },
        password: { type: String },
      },
    ],
    role: { type: String, default: "customer" },
    deletedAt: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
userSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findByToken(token) {
    return this.findOne({ verifyToken: token }, { password: 0 }).exec();
  },
  verify(token) {
    return this.findOneAndUpdate(
      { verifyToken: token },
      { isActive: true, verifyToken: null }
    ).exec();
  },
  checkAdmin(id) {
    return this.findOne({ $and: [{ _id: id }, { role: "admin" }] }).exec();
  },
  removeById(id) {
    return this.findByIdAndRemove(id).exec();
  },
  findByEmail(email) {
    return this.findOne({ email: email }).exec();
  },
  showListUser() {
    return this.find({ role: "customer" }).exec();
  },
  findActiveById(id) {
    return this.findById(id, { isActive: 1, email: 1, verifyToken: 1 }).exec();
  },
  updateActiveUser(id, defaultActive) {
    return this.findByIdAndUpdate(id, { isActive: !defaultActive }).exec();
  },
  createPassward(id, pw) {
    return this.findByIdAndUpdate(id, { password: pw }).exec();
  },
  updatePassword(id, hashedPassword) {
    return this.findByIdAndUpdate(id, { password: hashedPassword }).exec();
  },
  updateFarmerArrayPW(id, data) {
    return this.findByIdAndUpdate(id, {
      $push: {
        dataFarmer: {
          $each: [
            {
              idFarmer: data.idFarmer,
              keyLogin: data.username,
              password: data.password,
            },
          ],
        },
      },
    }).exec();
  },
  updateDatafarmer(iduser, namefarmer, idfarmer, lastIdUsername) {
    return this.findOneAndUpdate(
      { $and: [{ _id: iduser }, { "dataFarmer.keyLogin": namefarmer }] },
      {
        $set: {
          "dataFarmer.$.idFarmer": idfarmer,
          "dataFarmer.$.keyLogin": lastIdUsername,
        },
      }
    ).exec();
  },
  getDataPwfarmer(id) {
    return this.findById(id, { dataFarmer: 1 }).exec();
  },
  getDataUser(id) {
    return this.findById(id, { password: 0, dataFarmer: 0 }).exec();
  },
};
userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password); //compareSync là chức năng của gói bcrypt
  },
};

module.exports = mongoose.model("User", userSchema);
