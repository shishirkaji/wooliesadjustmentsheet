import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Table, Button, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import setAuthToken from "../util/setAuthToken";
import Comment from "./Comments";

const Adjustments = ({ masterState }) => {
  const [state, setState] = useState({
    adjustments: null,
    loading: true,
    reload: true,
    position: localStorage.position ? localStorage.position : null,
  });

  useEffect(() => {
    loadAdjustment();
    // console.log("reached useeffect adjustment");
    // console.log(masterState.user);
    // setState({...state, user: (masterState.user!==null ? masterState.user : null)})
  }, [state.reload]);

  const loadAdjustment = async () => {
    const route =
      "/api/adjustment/" + masterState.adjustmentDate + "/Night_Fill";
    try {
      setAuthToken(masterState.token);
      const res = await axios.get(route);
      if (masterState.adjustmentDate != null) {
        setState({ ...state, adjustments: res.data, loading: false });
      }
    } catch (error) {
      // console.log("loadadjuetment error ");
      return <div>Server error</div>;
    }
  };
  const renderEditComment = () => {
    // console.log("edit comment true");
    return <Comment editComment={true} />;
  };
  const renderReadOnlyComment = () => {
    // console.log("edit comment false");

    return <Comment editComment={false} />;
  };
  const changeVerified = async (sentAdjust) => {
    // sentAdjust = { ...sentAdjust, verrified: true };
    // const res = await axios.post(route);
    const adjustmentID = sentAdjust._id;
    const route = "/api/adjustment/toggleVerify/" + adjustmentID;
    await axios.get(route);
    state.reload
      ? setState({ ...state, reload: false })
      : setState({ ...state, reload: true });
  };
  const changeStatus = async (sentAdjust) => {
    // sentAdjust = { ...sentAdjust, verrified: true };
    // const res = await axios.post(route);
    const adjustmentID = sentAdjust._id;
    const route = "/api/adjustment/toggleStatus/toggle/" + adjustmentID;
    await axios.get(route);
    state.reload
      ? setState({ ...state, reload: false })
      : setState({ ...state, reload: true });
  };

  return state.loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          {/* <Link to="/">Home</Link> */}
          Home
        </Breadcrumb.Item>

        <Breadcrumb.Item href="/login">
          {/* <Link to='/login'>Dashboard</Link> */}
          Dashboard
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item active>
          Adjustment {masterState.adjustmentDate}
        </Breadcrumb.Item> */}
      </Breadcrumb>
      <br />
      <h1>Adjustment for {masterState.adjustmentDate}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Payroll Id</th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Comment</th>
            <th>Verified</th>
            {state.position === "officer" ? <th>Status</th> : null}
          </tr>
        </thead>
        <tbody>
          {state.adjustments.map((adjustment) => (
            <tr>
              <td>{adjustment.payrollId}</td>
              <td>{adjustment.name}</td>
              <td>{adjustment.startTime}</td>
              <td>{adjustment.endTime}</td>
              <td class="">{adjustment.comment}</td>

              <td>
                <Button
                  onClick={() => {
                    changeVerified(adjustment);
                  }}
                  variant={adjustment.verrified ? "success" : "danger"}
                >
                  {adjustment.verrified ? (
                    <div>Verified</div>
                  ) : (
                    <div>Verify</div>
                  )}
                </Button>
              </td>
              {state.position === "officer" ? (
                <td>
                  <Button
                    onClick={() => {
                      changeStatus(adjustment);
                    }}
                    variant={
                      adjustment.status === "adjusted" ? "success" : "danger"
                    }
                  >
                    {adjustment.status === "adjusted" ? (
                      <div>Adjusted</div>
                    ) : (
                      <div>Pending</div>
                    )}
                  </Button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
      {state.position === "officer"
        ? renderReadOnlyComment()
        : renderEditComment()}
    </div>
  );
};

export default Adjustments;
