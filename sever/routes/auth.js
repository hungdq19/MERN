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
    const acessTokent = jwt.sign({ userId: newUser._id }, "HungDQ19");git
    res.json({ success: true, message: "register succesfully", acessTokent });
  } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "sever bi loi roi ......." });
  }
});

module.exports = route;
