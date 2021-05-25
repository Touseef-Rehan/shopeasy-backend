const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const verifytoken = (req, res, next) => {
  // console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);

  if (!token) res.send("You are not logged in").sendStatus(401);
  else {
    try {
      const verified = jwt.verify(token, process.env.jwtsecret);
      next();
    } catch (err) {
      res.send("user not verified");
    }
  }
};
module.exports = verifytoken;
