const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/checkToken");

const Post = require("../model/Post");

router.post("/", verifyToken, async (req, res) => {
  const { title, descriptions, url, status } = req.body;
  console.log(title, descriptions, url, status);
  if (!title)
    return res
      .status(500)
      .json({ success: false, message: "Vui long nhap truong title ^^.." });
  try {
    const newPost = new Post({
      title,
      descriptions,
      url: url.startsWith("http://") ? url : `http://${url}`,
      status: status || "Start",
      user: "6093f99b862b2f988e8b4c09",
    });
    await newPost.save();
    res.json({
      success: true,
      message: "Bai dang duoc tao thanh cong",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "err Server" });
  }
});
module.exports = router;
