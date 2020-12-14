import React, { useEffect, useState } from "react";
import Status from "./Status";
import Risk from "./Risk";
import Connects from "./Connects";
// import { parse } from "ipaddr.js";
// import ContactTrace from "./ContactTrace";
// import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");
  const [connects, setConnects] = useState("");
  //const [user, setContactTrace] = useState("");

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
      //setContactTrace(parseData.ContactTrace);
    } catch (err) {
      console.error(err.message);
    }
    try {
      const res = await fetch(
        "http://localhost:3001/other/getAllConnections",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({user1: localStorage.getItem("token"), homeuser: localStorage.getItem("token"), primuser: localStorage.getItem("token")})
        }
      );
      
      //not converting to array properly
      const parseData = await res.json();
      let obj = JSON.stringify(parseData);
      console.log(obj);
      // console.log(parseData);
      // console.log(obj.user2);
      // alert(obj.user2);
      setConnects(obj);
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

// function compileDataArr(data) {
//   let retArr = [];
//   let i;
//   let count = Object.keys(data).length;
//   for (i = 0; i < count; i++) {
//       retArr.push(JSON.parse(data.rows[i]).user2);
//   }
//   return retArr;
// }
  
return (
    <div>
      <h1 className="mt-5"><b>Dashboard</b></h1>
      <br></br>
      <h2>Welcome, {name}!</h2>
      <br></br>
      <h2>Based off of your current symptoms, this is your risk of COVID: {risk} </h2>
      <h3>If your risk isn't low, consider getting tested!</h3>
      <br></br>
      <h2>Current COVID Status: {status}</h2>
      <br></br>
      <h2>Active Contacts: {connects}</h2>
      <br></br>
      <Risk updateRisk = {setRisk} risk = {risk}/>
      <Status updateStatus = {setStatus} status = {status}/>
      <Connects updateConnects = {setStatus} connects = {connects}/>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;