import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const FormTwo = ({ values, registered, nextStep, handleDate }) => {
  const { enteredDate } = values;
  const [state, setState] = useState({
    selectedDate: new Date(),
    alert: null,
    name: null,
    payrollId: values.payrollId,
    phoneNumber: null,
    email: null,
    department: values.department,
  });
  useEffect(() => {}, [state.alert]);
  const validate = () => {
    var validated = true;

    if (enteredDate == null) {
      validated = false;
      setState({ ...state, alert: "Please select date" });
    }
    if (validated === true) {
      nextStep();
    }
  };
  const next = (e) => {
    e.preventDefault();
    validate();
  };
  const handleChange = (date) => {
    setState({ selectedDate: date });
    let formatted_date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const day = date.getDay();
    var formatted_day = null;
    switch (day) {
      case 1:
        formatted_day = "Monday";
        break;
      case 3:
        formatted_day = "Wednesday";
        break;

      case 4:
        formatted_day = "Thursday";
        break;

      case 5:
        formatted_day = "Friday";
        break;

      case 6:
        formatted_day = "Saturday";
        break;

      case 7:
        formatted_day = "Sunday";
        break;

      default:
        formatted_day = "Tuesday";
        break;
    }
    handleDate(formatted_date, formatted_day);
  };
  const onClick = (e) => {
    setState({ ...state, alert: null });
  };
  const callDatePicker = () => {
    return (
      <div>
        <h1>Hello {values.name}, </h1>
        <Form>
          <Form.Label>Please select date</Form.Label>
          <div class="col-xs-6 col-sm-4">
            <DatePicker
              selected={state.selectedDate}
              onChange={handleChange}
              date={new Date()}
            />
          </div>
          <Button onClick={next} variant="primary">
            Continue
          </Button>
          <br />
          <br />

          <div>
            <q>{values.quote.text}</q>
            <p>- {values.quote.author}</p>
          </div>
         
        </Form>
      </div>
    );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("reached handle submit");
    const { name, payrollId, phoneNumber, email, department } = state;
    const body = JSON.stringify({
      name,
      payrollId,
      department,
      phoneNumber,
      email,
    });
    try {
      const res = await axios.post("api/employee/addEmployee", body, config);
      console.log(res.status);

      if (res.status === 200) {
        console.log("registeed from form 2");
        registered();
      } else if (res.status === 400){
        state.alert = "All the below fields are mandatory";
      }
    } catch (err) {
      setState({ ...state, alert: "All the below fields are mandatory" });
      console.log(err);
      return false;
    }
  };
  const handleStateChange = (input) => (e) => {
    e.preventDefault();
    setState({ ...state, [input]: e.target.value });
  };
  const callRegistration = () => {
    return (
      <div>
        <h1>
          Looks like you are not registered,<br></br>
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Payroll Id</Form.Label>
            <Form.Control
              type="number"
              placeholder="Eg: 1089634"
              onChange={handleStateChange("payrollId")}
              defaultValue={values.payrollId}
            />
          </Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            defaultValue={values.department}
            onChange={handleStateChange("department")}
          >
            <option>Select your department</option>
            <option>Night_Fill</option>
            <option>Service</option>
            <option>Bakery</option>
            <option>Others</option>
          </Form.Control>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleStateChange("email")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shishir"
              onChange={handleStateChange("name")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="0452445***"
              onChange={handleStateChange("phoneNumber")}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  };
  return (
    <div>
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
      )}{" "}
      {values.name == null ? callRegistration() : callDatePicker()}
    </div>
  );
};

export default FormTwo;
