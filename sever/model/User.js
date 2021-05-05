// Create Model User........
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // Khai Bao Name  co kieu du lieu la String, bat buoc phai nhap, va chi ton tai duy nhat 1 userName trong DB
  username: {
    type: String,
    required: true,
    unique: true,
  },
  //Khai bao password co kieu du lieu la String, va bat buoc phai nhap
  password: {
    type: String,
    required: true,
  },
  //Thoi gian bat dau tao ra doi tuong
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("users", UserSchema);
