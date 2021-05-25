const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const verify = require("./routes/verify");
dotenv.config();
const authroutes = require("./routes/auth");
app.use(express.json());
app.use("/auth", authroutes);
const cookieparser = require("cookie-parser");
app.use(cookieparser());
const usercollection = require("./models/user");
const { findOne } = require("./models/user");

app.post("/userinfopost", verify, async (req, res) => {
  console.log(req.body);
  await usercollection.updateOne(
    { email: req.body.email },
    { $set: { cartitems: req.body.cartitems } },
    (err, re) => {
      console.log(re);
    }
  );
  let find = await usercollection.findOne({ email: req.body.email });
  res.send(find);
});

mongoose.connect(process.env.databaseconnecturl, () => {
  console.log("connected to mongodb");
});

app.listen(5000, () => {
  console.log("app has started");
});
