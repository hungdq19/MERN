const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Token missing" });
  try {
    const decode = jwt.verify(token, "HungDQ19");
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: "Token invalid" });
  }
};
module.exports = verifyToken;
