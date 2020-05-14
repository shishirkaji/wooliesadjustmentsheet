import React, { useState,useEffect } from "react";
import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import { Button, Card, FormControl} from "react-bootstrap";

const Comments = (editComment) => {

  const [state, setState] = useState({
    comment: null,
    addedDate: localStorage.adjustmentDate,
    addedBy: null
  });
  useEffect(async()=>{
    // loading the comment if any available
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setAuthToken(localStorage.token);
    const route  = "/api/comments/"+state.addedDate
    try {
      const res = await axios.get(route);
      if (res) {
        // console.log(res)
        if (res){
          // there will be an error if there is no comment because t
          // cause the response is  not json with data.comment need to fix api 
          setState({...state, comment : res.data.comment});
        }
      }
    } catch (error) {
      // console.log(error);
    }

  },[state.addedBy])
  const submit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setAuthToken(localStorage.token);
    var comment = state.comment+" end of comment.";
    var addedDate = state.addedDate;
    const body = JSON.stringify({ comment, addedDate });
    try {
      const res = await axios.post("/api/comments/addComment", body, config);
      if (res) {
        console.log(res)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (input) => (e) => {
    e.preventDefault();
    setState({ ...state, comment: e.target.value });
  };
 const onFalse  = ()=>{
  // console.log(editComment)

  return <div>
  <Card>
   <Card.Header>Comments from the Manager:</Card.Header>
   <Card.Body>
     {/* <Card.Title>Special title treatment</Card.Title> */}
     <Card.Text>
  {state.comment}
     </Card.Text>
   </Card.Body>
 </Card>
 </div>
 }
 const onTrue  = ()=>{
   console.log(editComment)
  return <div>
    comment when true

  <FormControl
  as="textarea"
  aria-label="With textarea"
  value = {state.comment ==="no comment" ? "Please add your comments here":state.comment}
  onChange={handleChange("comment")}
/>
<br></br>
<Button onClick={submit} variant="primary">
  Continue
</Button>
</div>
}
  return (
    <div>
      <h1>Comments</h1>
      
      {/* {addEditComment()} */}
      {/* {onFalse()}
    {onTrue()} */}
      {editComment.editComment === true ? onTrue() :onFalse() }
    </div>
  );
};

export default Comments;
