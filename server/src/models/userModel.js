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
  removeById(id){
    return this.findByIdAndRemove(id).exec();
  },
  findByEmail(email){
    return this.findOne({email: email}).exec();
  },
  showListUser() {
    return this.find().exec();
  },
  findActiveById(id) {
    return this.findById(id, { isActive: 1,email:1 }).exec();
  },
  updateActiveUser(id, defaultActive) {
    return this.findByIdAndUpdate(id, { isActive: !defaultActive }).exec();
  },
  createPassward(id,pw){
    return this.findByIdAndUpdate(id,{password:pw}).exec();
  }
};
userSchema.methods = {
  comparePassword(password){
      return bcrypt.compareSync(password,this.password); //compareSync là chức năng của gói bcrypt
  }
};

module.exports = mongoose.model("User", userSchema);
