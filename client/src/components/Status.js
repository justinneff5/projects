import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

// import { toast } from "react-toastify";

const Status = ({updateStatus, status}) => {
const [myStatus, updateMyStatus] = useState(status)
const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { username: localStorage.getItem("token"), status: myStatus };
      const response = await fetch(
        "http://localhost:3001/authentication/status",
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
        updateStatus(myStatus);
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
      <h1 className="mt-5 text-center">Update COVID Status</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="radio"
          checked = {myStatus === "positive"}
          name="positive"
          value="positive"
          onChange={e => updateMyStatus("positive")}
          className="form-control my-3"
        /> Positive
        <input
          type="radio"
          checked = {myStatus === "negative"}
          name="negative"
          value="negative"
          onChange={e => updateMyStatus("negative")}
          className="form-control my-3"
        /> Negative
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </Fragment>
  );
};

export default Status;