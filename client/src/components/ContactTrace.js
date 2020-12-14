import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

function compileDataArr(data) {
  let retArr = [];
  let i;
  let count = Object.keys(data).length;
  for (i = 0; i < count; i++) {
      retArr.push(data[i].user2);
      }
  return retArr;
}

function compileDataStatus(data) {
    let retStr;
    retStr = data.status;
    return retStr;
}

// function compileDataRisk(data) {
//     let retStr = JSON.parse(data).risk;
//     return retStr;
// }

function getAllConnections(username, homeusername, primusername) {
    let user = username;
    let home = homeusername;
    let prim = primusername;
    let retDat;
    fetch('http://localhost:3001/other/getAllConnections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user1 : user, homeuser : home, primuser : prim}),
    })
    .then(response => response.json())
    .then(data => {
        retDat = compileDataArr(data);
        return retDat;
      //getUsers();
    });
}

  function getStatus(username) {
    let user = username;
    let retDat;
    fetch('http://localhost:3001/authentication/getStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    })
    .then(response => response.json())
    .then(data => {
        retDat = compileDataStatus(data);
        return retDat;
    });
}

//   function getRisk(username){
//     let user = username;
//     fetch('http://localhost:3001/authentication/getRisk', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({user}),
//     })
//       .then(response => response.json())
//       .then(data => {
//         retDat = compileDataRisk(data);
//         return retDat;
//       });
//   }

  function updateRisk(username) {
    let user = username;
    fetch('http://localhost:3001/authentication/risk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
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

//   const contactTrace = ({username}) => {
// //     const [myContactTrace, updateContactTrace] = useState(username)
//     const onSubmitForm = async e => {
//         e.preventDefault();
//         try {


    function contactTrace(username){
      let user = username;
      let primary = [];
      let secondary = [];
      let tertiary = [];
      let notifications = [];
      let count = 0;
      let riskCheck = 0;
      let i;
      let j;
      let k;
      
      primary = getAllConnections(user, user, user);
      for (i = 0; i < primary.length; i++){
        count++;
        secondary.length = 0; //resets second array
        if (getStatus(primary[i]) === "positive") {
          notifications.push("You came in contact with " + primary[i] + " who has tested positive for covid. You need to get tested!");
          riskCheck = 1;
        }
        // else if (getRisk(primary[i]) === "yes") {
        //   notifications.push("You came in contact with " + primary[i] + " who is at risk of being positive for covid. You need to get tested!");
        //   riskCheck = 1;
        // }
        secondary = getAllConnections(primary[i], user, primary[i]);
          for (j = 0; j < secondary.length; j++){
            count++;
            tertiary.length = 0; //resets tert array
            if (getStatus(secondary[j]) === "positive") {
              notifications.push("You came in secondary contact with " + secondary[j] + " who has tested positive for covid. You need to get tested!");
              riskCheck = 1;
            }
            // else if (getRisk(secondary[j]) === "yes") {
            //   notifications.push("You came in secondary contact with " + secondary[j] + " who is at risk of being positive for covid. You need to get tested!");
            //   riskCheck = 1;
            // }
            tertiary = getAllConnections(secondary[j], user, primary[i]);
              for (k = 0; k < tertiary.length; k++){
                count++;
                if (getStatus(tertiary[k]) === "positive") {
                  notifications.push("You came in tertiary contact with " + secondary[j] + " who has tested positive for covid. You need to get tested!");
                  riskCheck = 1;
                }
                // else if (getRisk(tertiary[k]) === "yes") {
                //   notifications.push("You came in tertiary contact with " + secondary[j] + " who is at risk of being positive for covid. You need to get tested!");
                //   riskCheck = 1;
                // }
            }
        }
      }
      if (riskCheck === 1) {
        updateRisk(user);
      }
      return notifications;
    //   notifications.forEach(function(item){
    //     //document.getElementById("notifications").innerHTML = document.getElementById("notifications").innerHTML + "<br>" + item + "<br>";
    //   }) //probably need to populate innerhtml w this

    


    // return (
    //     <Fragment>
    //       <h3 className="mt-5">Contact Trace</h3>
    //       <form onSubmit={onSubmitForm}>
    //         <input
    //           type="radio"
    //           checked = {myStatus === "positive"}
    //           name="positive"
    //           value="positive"
    //           onChange={e => updateMyStatus("positive")}
    //           className="form-control my-3"
    //         /> Positive
    //         <input
    //           type="radio"
    //           checked = {myStatus === "negative"}
    //           name="negative"
    //           value="negative"
    //           onChange={e => updateMyStatus("negative")}
    //           className="form-control my-3"
    //         /> Negative
    //         <button className="btn btn-success btn-block">Submit</button>
    //       </form>
    //     </Fragment>
    //   );
  }

 //document.getElementById("contacttrace").addEventListener("click", contactTrace, false);