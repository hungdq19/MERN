//Khoi tao server
const express = require("express");
//Connect MongoDB server
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// import Route Authentication
const authRoute = require("./routes/auth");
//import router Posts in App
const postRoute = require("./routes/post");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connected db successfully........");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.get("/", (req, res) => res.send("Hello backend of HungDQ19....."));
const PORT = 5000;
app.listen(PORT, () => console.log("Sever start port 5000...."));
