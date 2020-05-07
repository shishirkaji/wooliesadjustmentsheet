const express = require("express");
const router = express.Router();
const Employee = require("../../models/Empoyee");
const { check, validationResult } = require("express-validator");
// Route : GET test route
// desc : test
router.get("/", (req, res) => {
    
  
    return res.json({"employee":"test"});
});
// Route : POST api/employee/validate
// desc : validate if the employee exists in the database and return name
router.post(
  "/validate",
  [check("payrollId", "Payroll Id is required").not().isEmpty()],
  async (req, res) => {
    console.log("reached the validate employee api");
    
    const errors = validationResult(req);
    const payroll= req.body.payrollId;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const employee =await  Employee.findOne({ payrollId: payroll })
      .select(
       "name"
      );
    if (employee){
        return res.send(employee); 
    }else{
        return res.status(400).json({error: "employee not found"});
    }
    } catch (error) {
        console.log("reached error")
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
);

// Route : POST api/employee/addEmployee
// desc : add employee to the database

router.post(
  "/addEmployee",
  [
    check("payrollId", "Payroll Id is required").not().isEmpty(),
    check("name", "name is required").not().isEmpty(),
    check("phoneNumber", "phone number is required").not().isEmpty(),
    check(
      "phoneNumber",
      "Please enter phone number is correct format i.e. 0452445*** "
    ).isLength({ min: 9 }),
    check("department", "department is required").not().isEmpty(),
    
    check("email", "email is required").not().isEmpty(),
    check("email", "email is not in the correct format").isEmail(),
  ],
  async (req, res) => {
    console.log("reached addemployee");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    console.log("reached addemployee 1");

      return res.status(400).json({ errors: errors.array() });
    }
    const { payrollId, name, email, phoneNumber,department } = req.body;
    try {
      employee = new Employee({
        payrollId,
        name,
        email,
        phoneNumber,
        department
      });
      const checkPayrollId = await Employee.findOne({ payrollId: payrollId });
      if (checkPayrollId) { 
        console.log("error here")
        return res.status(400).send("User exists")
      }
      await employee.save();
      // return res.send(employee)
      return res.status(200).json({"msg":"employee added to the system"});
    } catch (error) { 
      console.log(errors);
      console.log("server error")
      return res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
