const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    profile: {
      fullName: { type: String, default: "" },
      avatar: { type: String, default: "" },
      gender: { type: String, default: "" },
      address: { type: String, default: "" },
    },
    role: { type: String, default: "staff" },
    deletedAt: { type: Boolean, default: "false" },
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
};
module.exports = mongoose.model("User", userSchema);
