import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import validateFunction from "../util/validatePRID";

const FormOne = ({ values,handleNameeChange, nextStep, handleChange }) => {
  const [state, setState] = useState({
    userName: null,
    alert: null,
    
  });
  const { payrollId, department } = values;

  const validate = () => {
    var validated = true;
    if (payrollId == null) {
      setState({ ...state, alert: "Please enter your employee number." });
      validated = false;
    }
    // if (name == null) {
    //   setState({ alert: "Please enter your name." });
    //   validated = false;
    // }

    if (department == null) {
      setState({ ...state , alert: "Please select your department." });
      validated = false;

      // In the below function i will call the backend api to check if the payroll id is registered.
      // if registered then confirm Name and email ;
      // if not registered then open a portal to register
    }
    if (validated === true) {
      nextStep();
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resFromValidatePID = await validateFunction(true, payrollId);
  if (resFromValidatePID === "employee not found"){
    console.log("Employee not found");
  }else{
    state.userName = resFromValidatePID.data.name
    handleNameeChange(resFromValidatePID.data.name)
  }
    validate();
  };
  const onClick = (e) => {
    setState({ ...state, alert: null });
  };

  return (
    <section>
      {state.alert == null ? null : (
        <div class="alert alert-danger" role="alert">
          {state.alert}
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={onClick}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
     
 <Form onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustomUsername">
          <Form.Label>Payroll Id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Eg: 1089634"
            onChange={handleChange("payrollId")}
            defaultValue={values.payrollId}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your payroll id
          </Form.Control.Feedback>
        </Form.Group>

       
        <Form.Label>Department</Form.Label>
        <Form.Control
          as="select"
          defaultValue={values.department}
          onChange={handleChange("department")}

          //
        >
          <option>Select your department</option>
          <option>Night_Fill</option>
          <option>Service</option>
          <option>Bakery</option>
          <option>Others</option>
        </Form.Control>
        <br></br>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
      
    </section>
  );
};

export default FormOne;
