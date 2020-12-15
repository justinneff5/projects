import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Connection(userOne, userTwo, userTwoStatus) {
  this.user1 = userOne;
  this.user2 = userTwo;
  this.user2status = userTwoStatus;
}

function compileDataArr(data) { //take second parameter x username
  let retArr = [];
  let i;
  let count = Object.keys(data).length;
  for (i = 0; i < count; i++) {
      retArr.push(new Connection(data[i].user1, data[i].user2, data[i].user2status));
      
      }
    return retArr;
}


///GET CACHE

const getCache = async() => {
  // function getCache(){
    try {
      //let u2status = "positive"; // change back to positive
      let x;
      const res = await fetch('http://localhost:3001/other/cacheDatabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const r = await res.json();
      //console.log(r);
      x = compileDataArr(r);
      console.log(x);
      return x;
      //Promise.resolve(x);
      // store(x);
      //console.log(x[0].user1);
      //return x;
      // if (res.status === 200) {
      //   console.log("sup");
      // }
      //this.setState({Cache: x});
    }
    catch (err) {
       console.error(err.message);
    }
    //return getCache();
    
    // .then(response => response.json())
    // .then(data => {
    //     x = compileDataArr(data);
    //     console.log(data);
    //     console.log(x);
        //return getCache;
        //return retDat;
        // retDat = await res.json();
        // dat = compileDataArr(retDat);
        // return dat;
}



  function updateRisk(userUp) { //this updates to positive
    let user = userUp;
    let riskStatus = 'some';
    fetch('http://localhost:3001/authentication/risk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username : user, risk : riskStatus}),
    })
    .then(data => {
      //console.log(data);
      //getUsers();
    });
  }



// import { toast } from "react-toastify";

// const Status = ({updateStatus, status}) => {
// const [myStatus, updateMyStatus] = useState(status)
// const onSubmitForm = async e => {
//     e.preventDefault();
//     try {
//ES6 -> arrow functions
//parameter => 
//
  function networkStatus(num, pos) {
    let str;
    if (num == 0) {
      str = "Wow! You have 0 connections. Great job, you are being very safe!";
    }
    else if (num < 20 && num > 0) {
      str = "Your network status is yellow! You have " + num + " connections to the tertiary level. You're being relatively safe.";
    }
    else if (num >= 20 && num < 40) {
      str = "  Your network status is orange! You have " + num + " connections to the tertiary level. You're being pretty unsafe.";
    }
    else {
      str = " Your network status is red! You have " + num + " connections to the tertiary level.";
    }
    if (pos === 0) {
      str += " However, you have not come into contact with a positive user.";
    }
    return str;
  }
  


  async function contactTrace(username){
      let user = username;
      console.log(user);
      let cache = await getCache();
      console.log("flag");
      console.log(cache);
      let primary = [];
      let secondary = [];
      let notifications = [];
      let count = 0;
      let riskCheck = 0;
      let i;
      let j;
      
    //notifications.push("You came in contact with " + primary[i] + " who has tested positive for covid. You need to get tested!");

      for (i = 0; i < cache.length; i++) { //set up primary connections
        //console.log()
        if(cache[i].user1 === user) { //all conn where main user is user1
          primary.push(cache[i].user2);
          count++;
          if (cache[i].user2status === "positive") {
            notifications.push("You came in primary contact with " + cache[i].user2 + " who has tested positive for covid. You need to get tested!");
            riskCheck = 1;
          }
        }
        console.log(primary);
        
      }
      for (i = 0; i < cache.length; i++) { //set up secondary connections
        for (j = 0; j < primary.length; j++) { //all conn where primary connection is user1
          if(cache[i].user1 === primary[j] && primary[j] != user) {
            secondary.push(cache[i].user2);
            count++;
            if (cache[i].user2status === "positive") {
              notifications.push("You came in secondary contact with " + cache[i].user2 + " who has tested positive for covid. You need to get tested!");
              riskCheck = 1;
            }
          }
        }
      }

      for (i = 0; i < cache.length; i++) { //set up tertiary connections
        for (j = 0; j < secondary.length; j++) { 
          if(cache[i].user1 === secondary[j] && secondary[j] != user) {
            count++;
            if (cache[i].user2status === "positive") {
              notifications.push("You came in tertiary contact with " + cache[i].user2 + " who has tested positive for covid. You need to get tested!");
              riskCheck = 1;
            }
            j = secondary.length; //removes chance of dupes
          }
        }
      }

      
      if (riskCheck === 1) {
        updateRisk(user);
      }
      //console.log(networkStatus(count, notifications.length));
      notifications.unshift(networkStatus(count, notifications.length));
      console.log("flag-notifications");
      console.log(notifications);
      return notifications;
  }

  //look at documentation to set state to notif

  const ContactTrace = ({updateContactTrace}) => {
    //const [myContactTrace, updateContactTrace] = useState(username)
    //use setState if this doesn't work
    const [notif, setNotif] = useState([]);
    //const [retDat, setRetDat] = useState([]);
      const onSubmitForm = async e => {
          e.preventDefault();
          const ct = await contactTrace(updateContactTrace);
          setNotif(ct);
          console.log(ct);
          console.log("flag-notif");
          console.log(notif);
      }
    return (
      //html here
      <Fragment>
        <div className = "CT">
          <div className = "populated">
            {/* {notif.forEach(function(x){
              return <li> {x} </li>; //should return html elements
            }) */}
            {notif.map((x) => <li key = "{x}">{x}</li>)}
          </div>
          <button className = "btn btn-success btn-block" onClick = {onSubmitForm}> Contact Trace! </button>
        </div>
      </Fragment>
    )
    }

    export default ContactTrace;