const express = require("express");
const AdjustmentData = require("../../models/AdjustmentData");
// const request = require('request');
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Route : POST api/adjustment
// desc : Adds the adjustment to the db
router.post(
  "/",
  [
    check("department", "Department is required")
      .not()
      .isEmpty(),
    check("payrollId", "PayrollId Is mandatory")
      .not()
      .isEmpty(),
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("startTime", "Please enter the start time in 12 hour clock.")
      .not()
      .isEmpty(),
    check("endTime", "Please enter the end time.")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log("reached api/adjustment")
      const {
        enteredDate,
        department,
        payrollId,
        name,
        startTime,
        enteredDay,
        endTime,
        comment,
      } = req.body;
      const adjustmentFields = {};
      if (department) adjustmentFields.department = department;
      if (payrollId) adjustmentFields.payrollId = payrollId;
      if (name) adjustmentFields.name = name;
      if (enteredDate) adjustmentFields.enteredDate = enteredDate;
      if (enteredDay) adjustmentFields.enteredDay = enteredDay;
      if (startTime) adjustmentFields.startTime = startTime;
      if (endTime) adjustmentFields.endTime = endTime;
      if (comment) adjustmentFields.comment = comment;
      // if (verrified) adjustmentFields.verrified = verrified;
      adjustment = new AdjustmentData(adjustmentFields);
      await adjustment.save();
      return res.json(adjustment);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
);

// Route : GET api/adjustment/:date/:department
// desc : gets all the adjustment with particular date and department 
router.get("/:date/:department", async (req, res) => {
  querrydate = req.params.date;
  department = req.params.department
  try {
    adjustment = (await (await AdjustmentData.find({ "enteredDate": querrydate , "department":department })));
    if (adjustment) {
      return res.send(adjustment);
    }
  } catch (error) {
      console.log(error);
  }
});

// Route : GET api/adjustment/:payrollId
// desc : gets all the adjustment for the particular employee
router.get("/:payrollId",async(req,res)=>{
    payrollId = req.params.payrollId;
    try {
        adjustment = (await (await AdjustmentData.find({ "payrollId":payrollId })));
        if (adjustment) {
          return res.send(adjustment);
        }
        else return res.send("no data")
      } catch (error) {
          console.log(error);
      }
})

// Route : Delete
// desc : deletes all the record in the db
// Warning caution before use !!
router.delete("/",async(req,res)=>{
    await AdjustmentData.deleteMany({'verrified':false},()=>{
        return res.send("all the records are deleted")
    })
})
module.exports = router;
