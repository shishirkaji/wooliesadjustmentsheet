const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const signjwt = require("./jwtsign");

// Route: Post api/user
// desc: register users
// access semi public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email address").not().isEmpty(),
    check("password", "please enter a password with > 6 digits").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.statuts(400).json({ errors: errors.array() });
    }
    const { name, email, payrollId, password } = req.body;
    try {
      user = new User({
        name,
        email,
        password,
        payrollId,
      });
      const salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(password, salt);

      const payload = {
        user: {
          id: user.id,
        },
      };
      await user.save();
      token = await signjwt(payload);
      res.json({ token });
    } catch (err) {
      console.log(err);
      return res.send("server error");
    }
  }
);
// Route: Post api/user/login
// desc: login user
// access semi public
router.post(
  "/login",
  [
    check("payrollId", "Invalid Credentials").not().isEmpty(),
    check("password", "Invalid Credentials").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { payrollId, password } = req.body;
    try {
      let user = await User.findOne({ payrollId });
      if (!user) {
        return res
          .status(403)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const payload = {
            user: {
              id: user.id,
            },
          };
          token = await signjwt(payload);
          return res.json({ token });
        }
        return res
          .status(403)
          .json({ errors: [{ msg: "invalid credentials" }] });
      });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server error")
    }
  }
);

module.exports = router;
