const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const signjwt = require("./jwtsign");

// Route: Post api/user
// desc: register users
// access semi public
router.post("/", [
  check("name", "Name is required")
    .not()
    .isEmpty(),
  check("email", "Please enter a valid email address").not().isEmpty(),
  check("password", "please enter a password with > 6 digits").isLength({
    min: 6
  })
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.statuts(400).json({errors:errors.array()})
    }
    const {name, email , password }= req.body;
try{
    user = new User({
        name,
        email,
        password
    });
    const salt = await bcrypt.genSaltSync(10);
    user.password =await bcrypt.hash(password, salt);

const payload = {
    user :{
        id : user.id
    }
}; 
await user.save();
token = await signjwt(payload);
res.json({token});
}catch(err){
    console.log(err);
    return res.send("server error");
}
})
module.exports = router;
