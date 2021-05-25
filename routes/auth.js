const auth = require("express").Router();
const usercollection = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
auth.post("/login", async (req, res) => {
  const emailexists = await usercollection.findOne({ email: req.body.email });
  if (!emailexists) {
    res.send("Email doesn't exist");
  } else {
    const verifypassword = bcrypt.compare(
      req.body.password,
      emailexists.password
    );
    if (!verifypassword) {
      res.send("incorrect password");
    } else {
      const token = jwt.sign(
        { email: emailexists.email },
        process.env.jwtsecret
      );
      res.setHeader("auth-token", token);
      res.send({ token: token, user: emailexists });
    }
  }
});

auth.post("/signup", async (req, res) => {
  const emailexists = await usercollection.findOne({ email: req.body.email });
  if (emailexists) {
    res.send("Emailexists");
    return;
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const newuser = usercollection({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword,
    });
    try {
      const saveduser = await newuser.save();
      const token = jwt.sign({ email: req.body.email }, process.env.jwtsecret);
      res.setHeader("auth-token", token);
      res.send({ token: token, user: newuser });
    } catch (err) {
      res.send(err);
    }
  }
});

module.exports = auth;
