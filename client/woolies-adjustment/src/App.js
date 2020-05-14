import React, { useState, useEffect } from "react";
import UseForm from "./components/UseForm";
import Header from "./components/partials/header";
import Login from "./components/auth/Login";
import Lostpage from "./components/Lostpage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "../src/util/setAuthToken";
import Adjustments from "./components/Adjustments";
import axios from "axios";
const App = () => {
  // const loadUserTest = async () => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //     try {
  //       console.log("reached the loadusertest");
  //       const res = await axios.get("/api/user/loaduser");
  //       // return user.department;
  //       // setState({
  //       //   ...state,
  //       //   user: user,
  //       // });
  //       // userr = res.data.user;
  //       console.log(res.data.user);
  //       return res.data.user;
  //     } catch (error) {
  //       console.log(error);
  //       return <div>Authentication error</div>;
  //     }
  //   }
  //   return null;
  // };
  // var userr = loadUserTest();
  // var userr = null;

  // var user = loadUserTest();
  const [state, setState] = useState({
    token: localStorage.token ? localStorage.token : null,
    adjustmentDate: localStorage.adjustmentDate
      ? localStorage.adjustmentDate
      : null,
    user: localStorage.user ? localStorage.user : null,
    position: localStorage.position ? localStorage.position : null,
    userName: localStorage.userName ? localStorage.userName : null,
  });
  useEffect(() => {
    loadUserawait();
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    //   try {
    //     console.log("reached the useeffect app.js");
    //     const res = await axios.get("/api/user/loaduser");
    //     // return user.department;

    //     setState({
    //       ...state,
    //       user: res.data.user,
    //     });
    //     // userr = res.data.user;
    //   } catch (error) {
    //     console.log(error);
    //     return <div>Authentication error</div>;
    //   }
    // }
  }, []);
  const loadUserawait = () => {
    loadUser();
  };
  const loadUser = async () => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("/api/user/loaduser");
      // return user.department;
      var user = res.data.user;
      // localStorage.setItem("userName", user.name);

      // console.log(user);
      if (user) {
        localStorage.setItem("position", user.position);
        // localStorage.setItem("user", JSON.stringify(user));

        // console.log(user);
        setState({
          ...state,
          position: user.position,
          token: localStorage.token,
          user: user,
          adjustmentDate: localStorage.adjustmentDate,
        });
      }else{
        logout();
      }
    } catch (error) {
      logout();

      // return <div>Authentication error</div>;
    }
  };
  const logout=()=>{
    localStorage.clear();
  }
  const setUser = (user) => {
    setState({ ...state, user: user });
  };
  const setToken = (sentToken) => {
    loadUser();
  };
  const setDate = (sentDate) => {
    setState({ ...state, adjustmentDate: sentDate });
  };
  // after we delete the localstorage token and date it automatically the state automatically sets
  // causing disposal of this function
  // const logOut = ()=>{
  //   // i
  //   setState({...state, state : null })
  // }
  return (
        <section className="container">
        <div>
    <Router>
      <Header masterState={state} setToken={setToken} setDate={setDate} />
      <Switch>
          <Route exact path="/" component={UseForm} />
          <Route
            
            path="/login"
            render={() => (
              <Login
                masterState={state}
                setDate={setDate}
                setToken={setToken}
              />
            )}
          />
          <Route
            
            path="/adjustment"
            render={() => <Adjustments masterState={state} />}
          />
        <Route component={Lostpage}/>


      </Switch>

    </Router>
    </div>
    </section>
  );
};
export default App;
