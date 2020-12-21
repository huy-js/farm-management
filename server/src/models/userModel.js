const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String, default: "" },
    phonenumber: { type: String, default: "" },
    profile: {
      fullName: { type: String, default: "" },
      avatar: { type: String, default: "" },
      gender: { type: String, default: "" },
      address: { type: String, default: "" },
    },
    dataFarmer: [
      {
        idFarmer: { type: String },
        username: { type: String },
        password: { type: String },
      },
    ],
    role: { type: String, default: "customer" },
    deletedAt: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
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
    return this.findById(id, { isActive: 1, email: 1 }).exec();
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
              username: data.username,
              password: data.password,
            },
          ],
        },
      },
    }).exec();
  },
  updateDatafarmer(iduser, namefarmer, idfarmer) {
    return this.findOneAndUpdate(
      { $and: [{ _id: iduser }, { "dataFarmer.username": namefarmer }] },
      {
        $set: { "dataFarmer.$.idFarmer": idfarmer },
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
