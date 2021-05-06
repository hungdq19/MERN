//Create api route auth........
const express = require("express");
const route = express.Router();
//import hash password
const argon2 = require("argon2");
//import json web token
const jwt = require("jsonwebtoken");
//Import User Model
const User = require("../model/User.js");
// @Route: POST : api/auth/register
// @desc: Register new user..
//access: public
route.post("/register", async (req, res) => {
  // Thong tin nguoi dung  gui req len server
  const { username, password } = req.body;
  // check validation cua nguoi dung da nhap chua
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Ban nhap thieu usernam or passWord...:((",
    });
  try {
    // Kiem tra thong tin username nguoi dung nhap co o trong database hay khong
    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({
        success: false,
        message: "Ten cua ban da duoc dang ki, vui long nhap lai....",
      });
    // hash password use argon2
    const hashPasswords = await argon2.hash(password);
    const newUser = new User({ username, password: hashPasswords });
    await newUser.save();
    // Create Token with userId: newUser._id
    const acessTokent = jwt.sign({ userId: newUser._id }, "HungDQ19");
    res.json({
      success: true,
      message: "Ban Dang ki tai khoan thanh cong",
      acessTokent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "sever bi loi roi ......." });
  }
});
// @Route: POST : api/auth/login
// @desc: login user
//access: public
route.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Ten Dang nhap hoac mat khau cua ban chua co",
    });
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Ten dang nhap or mat khau ban nhap dang bi sai",
      });

    const checkPassword = await argon2.verify(user.password, password);
    if (!checkPassword)
      return res.status(400).json({
        success: false,
        message: "Ten dang nhap or mat khau ban nhap dang bi sai",
      });
    const acessToken = jwt.sign({ userId: user._id }, "HungDQ19");
    res
      .status(200)
      .json({ success: true, message: "Dang nhap thanh cong", acessToken });
  } catch (error) {
    res.status(500).json({ success: false, message: "Sever loi :(((((....." });
  }
});

module.exports = route;
