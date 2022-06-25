const express = require("express");
const user = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//Route-1: Create a User using POST "/api/auth/createuser". NO auth needed
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
    body("password", "Password should be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errormsg = errors.array();
      console.log(req.body);
      return res.status(400).json({ success, errors: errors.array(), msg: errormsg[0].msg });
    }
    //Check wether user exists already
    try {
      let User = await user.findOne({ email: req.body.email });
      if (User) {
        return res
          .status(400)
          .json({ success, msg: "Sorry a User with this email already Exhists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      User = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        User: {
          id: User.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      // console.log(jwtData,process.env.JWT_SECRET)
      success = true;
      res.json({ success, authtoken, msg: " Account created Successfully " });
    } catch (error) {
      console.log(error);
      res.status(500).send("Some error occurred").json({ msg: "Some error occurred" });
    }
  }
);
//Route-2: Authenticate a User using POST "/api/auth/login". NO auth needed
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errormsg = errors.array();
      return res.status(400).json({ success, errors: errors.array(), msg: errormsg[0].msg });
    }
    //Check wether user exists already
    const { email, password } = req.body;
    try {
      let User = await user.findOne({ email });
      if (!User) {
        return res.status(400).json({ success, msg: "Invalid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, User.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, msg: "Invalid credentials" });
      }
      const data = {
        User: {
          id: User.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.send({ success, authtoken, msg: "Loggedin Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error occurred").json({ msg: "Some error occurred" });
    }
  }
);

//Route-3 : Get loggedin User details using POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    // console.log(userId)
    const User = await user.findById(userId).select("-password");
    res.send(User);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error occurred");
  }
});

module.exports = router;
