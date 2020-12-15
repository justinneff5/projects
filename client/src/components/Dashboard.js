import React, { useEffect, useState } from "react";
import Status from "./Status";
import Risk from "./Risk";
import Connects from "./Connects";
// import { parse } from "ipaddr.js";
import ContactTrace from "./ContactTrace";
import CheckUser from "./CheckUser";
// import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");
  const [connects, setConnects] = useState("");
  //const [traces, setContactTrace] = useState("");

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
      //setContactTrace(parseData.username);
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
      
      const parseData = await res.json();
      let x = compileDataArr(parseData);
      // console.log(parseData);
      //console.log(x);
      // let obj = JSON.stringify(parseData);
      // console.log(obj);
      // console.log(parseData);
      // console.log(obj.user2);
      // alert(obj.user2);
      setConnects(x);
    } catch (err) {
      console.error(err.message);
    }


    
  };

  // const Trace = async e => {
  //   e.preventDefault();
  //   let notif = null;
  //   try {
  //     notif = contactTrace(localStorage.getItem("token"));
  //     setContactTrace(notif);
  //   //   toast.success("Logout successfully");
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  
function compileDataArr(data) {
  let retArr = [];
  let i;
  let count = Object.keys(data).length;
  for (i = 0; i < count; i++) {
      retArr.push((data[i].user2) + ", ");
      }
  return retArr;
}
const traces = localStorage.getItem("token");

return (
    <div>
      <h1 className="mt-5"><b>Dashboard</b></h1>
      <br></br>
      <h2>Welcome, {name}!</h2>
      <br></br>
      <h2>Based off of current symptoms and exposure, this is your risk of COVID: {risk} </h2>
      <h3>If you have some risk, consider getting tested!</h3>
      <br></br>
      <h2>Current COVID Status: {status}</h2>
      <br></br>
      <h2>Active Contacts: {connects}</h2>
      <br></br>
      <ContactTrace updateContactTrace = {traces}/>
      <br></br>
      <CheckUser updateCheckUser/>
      <br></br>
      <Risk updateRisk = {setRisk} risk = {risk}/>
      <Status updateStatus = {setStatus} status = {status}/>
      <Connects updateConnects = {setConnects} connects = {connects}/>
      <br></br>
      {/* <button onClick={e => Trace(e)} className="btn btn-primary"></button> */}
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;