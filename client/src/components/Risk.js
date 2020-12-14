import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

// import { toast } from "react-toastify";

const Risk = ({updateRisk, risk}) => {
const [myRisk, updateMyRisk] = useState(risk)
const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { username: localStorage.getItem("token"), risk: myRisk };
      const response = await fetch(
        "http://localhost:3001/authentication/risk",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      // const parseRes = await response.json();
      // setAuth(true);
      if (response.status === 200) {
        updateRisk(myRisk);
      }
      // const parseRes = await response.json();
      // console.log(parseRes);

      // if (parseRes.jwtToken) {
      //   localStorage.setItem("token", parseRes.jwtToken);
      //   setAuth(true);
      //   toast.success("Logged in Successfully");
      // } else {
      //   setAuth(false);
      //   toast.error(parseRes);
      // }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h3 className="mt-5">Log your current symptoms!</h3>
      <form onSubmit={onSubmitForm}>
        <input
          type="checkbox"
          checked = {myRisk === "some"}
          name="fever"
          value="fever"
          onChange={e => updateMyRisk("some")}
          className="form-control my-3"
        /> Feel like you have had a fever?
        <input
          type="checkbox"
          name="chills"
          value="chills"
          className="form-control my-3"
        /> Chills?
          <input
          type="checkbox"
          name="ache"
          value="ache"
          className="form-control my-3"
        /> Unexplained muscle pain/body aches?
          <input
          type="checkbox"
          // checked = {myRisk === "some"}
          name="cough"
          value="cough"
          // onChange={e => updateMyRisk("some")}
          className="form-control my-3"
        /> New or worsening cough?
        <input
          type="checkbox"
          // checked = {myRisk === "low"}
          name="low"
          value="low"
          // onChange={e => updateMyRisk("low")}
          className="form-control my-3"
        /> Trouble breathing?
          <input
          type="checkbox"
          // checked = {myRisk === "low"}
          name="low"
          value="low"
          // onChange={e => updateMyRisk("low")}
          className="form-control my-3"
        /> New loss of sense of taste or sense of smell?
          <input
          type="checkbox"
          checked = {myRisk === "low"}
          name="low"
          value="low"
          onChange={e => updateMyRisk("low")}
          className="form-control my-3"
        /> None of the above
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </Fragment>
  );
};

export default Risk;