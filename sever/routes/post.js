const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/checkToken");

const Post = require("../model/Post");
//@route GET api/posts
//@desc get all post
//access private
router.get("/", verifyToken, async (req, res) => {
  try {
    // search post of user create postspec
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
  }
});
// @ Post :api/posts
//@desc :Create a new Post
//access : private
router.post("/", verifyToken, async (req, res) => {
  // Thong tin nguoi dung nhap vao
  const { title, descriptions, url, status } = req.body;
  // Truong hop khong nhap title
  if (!title)
    return res
      .status(500)
      .json({ success: false, message: "Vui long nhap truong title ^^.." });
  try {
    // Tao du lieu post trong databse dua vao nhung field nguoi dung req
    const newPost = new Post({
      title,
      descriptions,
      url: url.startsWith("http://") ? url : `http://${url}`,
      status: status || "Start",
      user: req.userId,
    });
    // save du lieu vao database
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
// @route : PUT api/posts/:id
//desc : Update PostS
//access private
router.put("/:id", verifyToken, async (req, res) => {
  // truyen gia trij _id post can update
  // nhap cac gia tri can sua vao
  const { title, descriptions, url, status } = req.body;
  // khong co title (title la truong bat buoc nhap)
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Ban chua co truong tile de sua" });
  try {
    // updatepost chinh la doi tuong chung ta can update,
    const updatepost = {
      title,
      descriptions: descriptions || "",
      url: (url.startsWith("http://") ? url : `http://${url}`) || "",
      status: status || "Start",
      user: req.userId,
    };
    // Tim kiem trong database xem co Post khong, va cai thang user dang ki moi sua duoc bai post
    const newpostUpdate = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updatepost,
      { new: true }
    );

    if (!newpostUpdate)
      return res
        .status(400)
        .json({ success: false, message: "Post not search ......." });
    res.json({
      success: true,
      message: "Update thanh cong post",
      post: newpostUpdate,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Error updating" });
  }
});
// Route delete api/post/:id
//desc delete post
// access private
router.delete("/:id", verifyToken, async (req, res) => {
  // Xoa theo dk : post can xoa la post nao, User nao dang ki moi duoc quyen xoa
  const deletePost = await Post.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  if (!deletePost)
    return res
      .status(401)
      .json({ success: false, message: "Post not found....." });
  res.json({
    success: true,
    message: "Xoa thanh cong",
    postDleted: deletePost,
  });
});
module.exports = router;
