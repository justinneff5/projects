import React, { useEffect, useState } from "react";
import Status from "./Status";
import Risk from "./Risk";
// import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/authentication/dashboard",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({username: localStorage.getItem("token")})
        }
      );
      
      const parseData = await res.json();
      // console.log(parseData);
      setName(parseData.username);
      setStatus(parseData.status);
      setRisk(parseData.risk);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    //   toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Dashboard</h1>
      <br></br>
      <h2>Welcome, {name}</h2>
      <br></br>
      <h2>Based off of your current symptoms, you have {risk} risk of COVID!</h2>
      <br></br>
      <h2>Current COVID Status: {status}</h2>
      <br></br>
      <Status updateStatus = {setStatus} status = {status}/>
      <Risk updateRisk = {setRisk} risk = {risk}/>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;