var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdjustmentSchema = new Schema({
  department: {
    type: String,
    required: true
  },
  payrollId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // needs to be in yyyy-mm-dd format
  enteredDate: {
    type: String
  },
  actualDateTime: {
    type: Date,
    default: Date.now
  },
  enteredDay:{
    type : String
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  // this is true if the duty manager has authorized it.
  verrified: {
    type: Boolean,
    default: false
  },
  // this is the field which states
  //  the name of the manager who verifies
  verrifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  // this gets updated to "success" if entered into the system
  status: {
    type: String,
    default: "pending"
  },
  adjustedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  // this comment is for kyle to put if she has any confusion
  adjustmentComment: {
    type: String
  }
});

module.exports = Adjustment = mongoose.model("adjustment", AdjustmentSchema);
