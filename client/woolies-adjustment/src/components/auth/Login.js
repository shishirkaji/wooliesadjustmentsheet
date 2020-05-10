import React, { useState, useEffect } from "react";
import { Form, Button, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

const Login = ({ masterState, setUser, setToken, setDate, loadUser }) => {
  const [state, setState] = useState({
    userName: null,
    userDepartment: null,
    payrollId: null,
    password: null,
    alert: null,
    formatted_date: null,
    selectedDate: new Date(),
  });

  useEffect(() => {
    console.log(masterState.token);
    console.log("reached here at useeffect login");
    // let formattedd_date =
    //   state.selectedDate.getFullYear() +
    //   "-" +
    //   (state.selectedDate.getMonth() + 1) +
    //   "-" +
    //   state.selectedDate.getDate();
    // if (masterState.adjsutmentDate !== formattedd_date) {
    //   localStorage.setItem("adjustmentDate", formattedd_date);
    //   setDate(formattedd_date);
    // }

    if (localStorage.token) {
      if (masterState.token !== localStorage.token) {
        console.log("loaded token from the localstorage from login use effect");
        setToken(localStorage.token);
      }
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    var validated = true;
    if (state.password == null || state.payrollId == null) {
      setState({ ...state, alert: "Please fill the below credentials" });
      validated = false;
    }
    if (validated === true) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      var payrollId = state.payrollId;
      var password = state.password;
      const body = JSON.stringify({ payrollId, password });
      try {
        const res = await axios.post("/api/user/login", body, config);
        if (res) {
          // token set once the token is set it should directly show the pick date part in the login page
          const token = res.data.token;
          localStorage.setItem("token", token);
          console.log("token set from submit fucntion in login js");
          let formattedd_date =
            state.selectedDate.getFullYear() +
            "-" +
            (state.selectedDate.getMonth() + 1) +
            "-" +
            state.selectedDate.getDate();
          if (masterState.adjustmentDate === null) {
            console.log("reached the localstorage date setting if statement");
            localStorage.setItem("adjustmentDate", formattedd_date);
            // setDate(formattedd_date);
          }
          setToken(token);
          // loadUser();
        }
      } catch (error) {
        console.log(error);
        setState({ ...state, alert: "Invalid credentials" });
      }
    }
  };
  const handleChange = (input) => (e) => {
    e.preventDefault();
    setState({ ...state, [input]: e.target.value });
  };
  const onClick = (e) => {
    e.preventDefault();
    setState({ ...state, alert: null });
  };
  const login = () => {
    return (
      <div>
        <Breadcrumb>
        <Breadcrumb.Item href="/">
            Home
          </Breadcrumb.Item>
          
        </Breadcrumb>
        <Form onSubmit={submit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Employee number</Form.Label>
            <Form.Control
              onChange={handleChange("payrollId")}
              type="number"
              placeholder="your id eg: 1089634"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange("password")}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br />
       
        </Form>
      </div>
    );
  };
  // const loadUser = async () => {
  //   setAuthToken(masterState.token);
  //   try {
  //     const res = await axios.get("/api/user/loaduser");
  //     // return user.department;
  //     const user = res.data.user;
  //     setUser(user);
  //     setState({
  //       ...state,
  //       userName: user.name,
  //       userDepartment: user.department,
  //     });
  //     return res.data.user;
  //   } catch (error) {
  //     console.log(error);
  //     return <div>Authentication error</div>;
  //   }
  // };
  const handleDateChange = (date) => {
    let formattedd_date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setState({ ...state, selectedDate: date, formatted_date: formattedd_date });
    localStorage.setItem("adjustmentDate", formattedd_date);
    setDate(formattedd_date);
  };

  // if the token is present in the localstorage then
  // the dashboard is loaded
  const dashboard = () => {
    // show the option to choose date of adjustmets for approval
    // allow a button to approve
    if (masterState.user === null) {
      console.log("masterState user is null");
      // loadUser();
    }
    console.log(state.selectedDate);

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            {/* <Link to="/">Home</Link> */}
            Home
          </Breadcrumb.Item>
        </Breadcrumb>
        <strong>
          Hi {masterState.user !== null ? masterState.user.name : "User"}{" "}
          Welcome to your Dashboard
        </strong>
        <br />
        <Form.Label>Pick date to get adjustmets</Form.Label>
        <Form class="col-xs-6 col-sm-4">
          <DatePicker
            selected={state.selectedDate}
            onChange={handleDateChange}
            date={new Date()}
          />
          <Button variant="primary">
            <Link class="a-login" to="/adjustment">
              Get adjustment list
            </Link>
          </Button>
        </Form>
      </div>
    );
  };
  console.log("reached just before return ");
  console.log(masterState.user);
  return (
    // alert div start
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
      )}
      {/* alert div ends */}
      {/* checking if the token in masterState has been updated once login is successful */}
      {masterState.token === null ? login() : dashboard()}
    </div>
  );
};

export default Login;
