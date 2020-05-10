import React, { useState,useEffect } from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import FormFour from "./FormFour";
import axios from "axios";
const UseForm = () => {
  const [formData, setFormData] = useState({
    quote: null,
    alert: null,
    step: 1,
    department: null,
    payrollId: null,
    name: null,
    enteredDate: null,
    enteredDay: "",
    stateStartTime: "",
    stateEndTime: "",
    comment: "",
  });
  const {
    step,
    department,
    payrollId,
    name,
    enteredDate,
    enteredDay,
    stateStartTime,
    stateEndTime,
    comment,
    quote
  } = formData;
  const values = {
    quote,
    step,
    department,
    payrollId,
    name,
    enteredDate,
    enteredDay,
    stateStartTime,
    stateEndTime,
    comment,
  };
  useEffect(() => {
    getQuoteFunction();
  }, []);
  
  const getQuoteFunction=async()=>{
    let newQuote = null;
      try {
       const  res = await axios({
          method: "GET",
          url: "https://type.fit/api/quotes",
        });
        const randomNumber = Math.floor(Math.random() * 1500 + 1);
         newQuote = res.data[randomNumber];
        setFormData({...formData, quote : newQuote});
      } catch (error) {
        console.log(error);
    }
  }
  const reset = () => {
    setFormData({
      alert: "Adjustment saved Successfully",
      step: 1,
      quote: null,
      department: null,
      payrollId: null,
      name: null,
      enteredDate: null,
      enteredDay: "",
      stateStartTime: "",
      stateEndTime: "",
      comment: "",
    });
  };
  const registered = () => {
    console.log("reached registered");
    setFormData({
      ...formData,
      alert: "You have successfully registered",
      step: 1,
    });
  };
  const handleChange = (input) => (e) => {
    e.preventDefault();
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleNameeChange = (sentName) => {
    formData.name = sentName;
  };
  const confirm = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const startTime = stateStartTime;
    const endTime = stateEndTime;
    const body = JSON.stringify({
      department,
      payrollId,
      name,
      enteredDate,
      enteredDay,
      startTime,
      endTime,
      comment,
    });
    try {
      const res = await axios.post("api/adjustment", body, config);
      console.log(res);
      if (res) {
        console.log("success");
      }
    } catch (err) {
      console.log(err);
      return <div>Server error</div>;
    }
    console.log("confirmed now make contact with the api");
    nextStep();
  };
  const handleDate = (formattedDate, formattedDay) => {
    setFormData({
      ...formData,
      enteredDate: formattedDate,
      enteredDay: formattedDay,
    });
  };
  const handleTtime = (formattedDate, formattedDay) => {
    setFormData({
      ...formData,
      stateStartTime: formattedDate,
      stateEndTime: formattedDay,
    });
  };

  const nextStep = async () => {
    
    setFormData({ ...formData, step: step + 1 });
  };
  // go to previous step
  const prevStep = () => {
    setFormData({ ...formData, step: step + 1 });
  };
  const onClick = (e) => {
    setFormData({ ...formData, alert: null });
  };
  switch (step) {
    case 1:
      return (
        <div>
          {formData.alert == null ? null : (
            <div class="alert alert-success" role="alert">
              {formData.alert}
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

          <FormOne
            nextStep={nextStep}
            handleChange={handleChange}
            // validate
            values={values}
            handleNameeChange={handleNameeChange}
          />
        </div>
      );
    case 2:
      // return <h1>fill day and date</h1>
      return (
        <FormTwo
          registered={registered}
          nextStep={nextStep}
          handleDate={handleDate}
          values={values}
        />
      );
    case 3:
      // return <h1>fill start time and end time | comment</h1>;
      return (
        <FormThree
          nextStep={nextStep}
          handleTtime={handleTtime}
          handleChange={handleChange}
          values={values}
        />
      );
    case 4:
      // return <h1>display all the data and confirm</h1>;
      return <FormFour values={values} confirm={confirm} />;
    case 5:
      reset();
      break;
    default:
      return <h1>noform</h1>;
  }
};

export default UseForm;
