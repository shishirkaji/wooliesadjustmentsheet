const express = require("express");
const auth = require("../../middleware/auth");
const AdjustmentData = require("../../models/AdjustmentData");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Route : POST api/adjustment/toggleVerify/:id
// desc : Toggles the verification
// and updates the verified by field in the model

router.get("/toggleVerify/:idd", auth, async (req, res) => {
  var verifiedBy = req.user.id;
  const verify = req.params.idd;
  console.log("reached the toggleverify route");
  console.log(verifiedBy)
  try {
    var adjustment = await AdjustmentData.findById(verify);
    var verification = adjustment.verrified;
    console.log(verification);
    console.log("after");
    if (verification) {
      verification = false;
    } else if (verification === false) {
      verification = true;
    }
    console.log(verification);
    await AdjustmentData.findByIdAndUpdate(req.params.idd, {
      verrified: verification,
      verrifiedBy: verifiedBy,
    });

    return res.send("successfully toggled verrified");
    // return res.status(200).JSON({msg:"Verification toggled"});
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error toggle verify unsuccessful");
  }
});

// Route : POST api/adjustment
// desc : Adds the adjustment to the db
router.post(
  "/",
  [
    check("department", "Department is required").not().isEmpty(),
    check("payrollId", "PayrollId Is mandatory").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("startTime", "Please enter the start time in 12 hour clock.")
      .not()
      .isEmpty(),
    check("endTime", "Please enter the end time.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log("reached post adjustment api/adjustment");
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
      return res.send("response from api/adjustment POST ")
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
);

// Route : GET api/adjustment/:payrollId
// desc : gets all the adjustment for the particular employee
router.get("/:payrollId", async (req, res) => {
  console.log("/api/adjustment/:payrollId route");
  payrollId = req.params.payrollId;
  try {
    adjustment = await await AdjustmentData.find({ payrollId: payrollId });
    if (adjustment) {
      return res.send(adjustment);
    } else return res.send("no data");
  } catch (error) {
    console.log(error);
  }
});
// Route : GET api/adjustment/:date/:department
// desc : gets all the adjustment with particular date and department
router.get("/:date/:department", async (req, res) => {
  querrydate = req.params.date;
  department = req.params.department;
  console.log(
    "reached the backend get all adjustment /api/adjustment/date/department "
  );
  try {
    adjustment = await AdjustmentData.find({
      enteredDate: querrydate,
      department: department,
    });
    if (adjustment) {
      return res.send(adjustment);
    }
  } catch (error) {
    console.log(error);
  }
});

// Route : Delete
// desc : deletes all the record in the db
// Warning caution before use !!
router.delete("/", async (req, res) => {
  await AdjustmentData.deleteMany({ verrified: false }, () => {
    return res.send("all the records are deleted");
  });
});

// Route : POST api/adjustment/toggleVerify/:id
// desc : Toggles the verification
// and updates the verified by field in the model

router.get("/toggleStatus/toggle/:idd", auth, async (req, res) => {
  var newAdjustedBy = req.user.id;
  const adjust = req.params.idd;
  console.log("reached the toggleStatus  route");
  console.log(newAdjustedBy);

  try {
    var adjustment = await AdjustmentData.findById(adjust);
    var newStatus = adjustment.status;
    console.log(newStatus);
    console.log("after");
    if (newStatus == "pending") {
      newStatus = "adjusted";
    } else if (newStatus == "adjusted") {
      newStatus = "pending";
    }
    console.log(newStatus);
    await AdjustmentData.findByIdAndUpdate(req.params.idd, {
      status: newStatus,
      adjustedBy: newAdjustedBy,
    });

    return res.send("successfully toggled Status");
    // return res.status(200).JSON({msg:"Verification toggled"});
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error toggle Status unsuccessful");
  }
});

module.exports = router;
