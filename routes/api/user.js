const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const signjwt = require("./jwtsign");
const config = require("config");
const auth = require("../../middleware/auth");

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
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, payrollId, password, department } = req.body;
    try {
      user = new User({
        name,
        email,
        password,
        payrollId,
        department,
      });
      const checkPayrollId = await User.findOne({ payrollId: payrollId });
      if (checkPayrollId) {
        return res.status(400).json({ error: "user exists" });
      }
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
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);
// Route: Post api/user/loaduser
// desc: loaduser
// access semi public
router.get("/loaduser", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log("reached the mofucking api");
    console.log(user);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
// Route : Delete
// desc : deletes all the record in the db
// Warning caution before use !!
router.delete("/", async (req, res) => {
  await User.deleteMany({ name: "Shishir" }, () => {
    return res.send("all the records username Shishir are deleted");
  });
});
module.exports = router;
