import React from "react";
import { Button } from "react-bootstrap";

const FormFour = ({ values , confirm}) => {
  // console.log(values)
  const {
    department,
    payrollId,
    name,
    enteredDate,
    enteredDay,
    stateStartTime,
    stateEndTime,
    comment,
  } = values;
  const next = (e) => {
    e.preventDefault();
    confirm();
  };
  return (
    <div>
      Adjustment Details:
      <p>
        <strong>Department :</strong> {department}
      </p>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Payroll Id:</strong> {payrollId}
      </p>
      <p>
        <strong>Entered Date:</strong> {enteredDate}
      </p>
      <p>
        <strong>Entered Day:</strong> {enteredDay}
      </p>
      <p>
        <strong>Start Time:</strong> {stateStartTime}
      </p>
      <p>
        <strong>End Time:</strong> {stateEndTime}
      </p>
      <p>
        <strong>Comments: </strong> {comment}
      </p>
      <Button onClick={next} variant="primary">
        Save
      </Button>
    </div>
  );
};

export default FormFour;
