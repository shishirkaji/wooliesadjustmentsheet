var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  payrollId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});
module.exports = Employee = mongoose.model("employee", EmployeeSchema);
