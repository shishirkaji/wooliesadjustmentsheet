import React, { useState } from "react";
import TimeField from "react-simple-timefield";
import { Button, Form, FormControl} from "react-bootstrap";

const FormThree = ({ nextStep, handleTtime, handleChange, values }) => {
  const [state, setState] = useState({
    alert: "Note the clock is 24 hours.",
    stateStartTime: null,
    stateEndTime: null,
  });
  // const { startTime, endTime } = values;

  const validate = () => {
    var validated = true;

    if (state.stateStartTime == null) {
      validated = false;
      setState({ ...state, alert: "Please enter Start Time" });
    }
    if (state.stateEndTime == null) {
      validated = false;
      setState({ ...state, alert: "Please Enter End Time" });
    }
    if (validated === true) {
      return validated;
    }
  };

  // the function is called when the form is subitted

  const next = (e) => {
    e.preventDefault();
    var validated = validate();
    if (validated ) nextStep();
  };

  const onChangeStartTime = (event, value) => {
    setState({ ...state, stateStartTime: value });
    handleTtime(value, state.stateEndTime);
    // handleTtime(state.stateStartTime, state.stateEndTime);

    // console.log("statestarttime : ");
  };
  const onChangeEndTime = (event, value) => {
    setState({ ...state, stateEndTime: value });
    handleTtime(state.stateStartTime, value);
  };
  // this function is used to remove alert
  const onClick = (e) => {
    setState({ ...state, alert: null });
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
            aria-label="Save"
            onClick={onClick}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <Form.Label>Adjust Start and End time</Form.Label>
      <br />
      <h3>Start Time </h3>
      <div class="react-time-picker_wrapper">
        <TimeField
          // value={state.startTime}
          onChange={onChangeStartTime}
          style={{
            border: "2px solid #666",
            fontSize: 42,
            width: 121,
            padding: "5px 8px",
            color: "#333",
            borderRadius: 3,
          }}
        />
      </div>
      <br></br>
      <h3>End Time </h3>

      <TimeField
        // value={state.endTime}
        onChange={onChangeEndTime}
        style={{
          border: "2px solid #666",
          fontSize: 42,
          width: 121,
          padding: "5px 8px",
          color: "#333",
          borderRadius: 3,
        }}
      />
      <br></br>

      <br></br>
      <h3>Comments </h3>
      <FormControl
        as="textarea"
        aria-label="With textarea"
        placeholder="Please specify any breaks // add or RC"
        onChange={handleChange("comment")}
      />
      <br></br>
      <Button onClick={next} variant="primary">
        Continue
      </Button>
    </div>
  );
};

export default FormThree;
