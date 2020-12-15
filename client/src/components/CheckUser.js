import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Connection(userOne, userTwo, userTwoStatus) {
  this.user1 = userOne;
  this.user2 = userTwo;
  this.user2status = userTwoStatus;
}

function compileDataArr(data) { 
  let retArr = [];
  let i;
  let count = Object.keys(data).length;
  for (i = 0; i < count; i++) {
      retArr.push(new Connection(data[i].user1, data[i].user2, data[i].user2status));
      
      }
    return retArr;
}

function compileStatus(data){
    let retStr = data.status;
    return retStr;
}


///GET CACHE

const getCache = async() => {
    try {
      let x;
      const res = await fetch('http://localhost:3001/other/cacheDatabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const r = await res.json();
      x = compileDataArr(r);
      console.log(x);
      return x;
    }
    catch (err) {
       console.error(err.message);
    }
}

const getStatus = async(username) => {
    try {
      let x;
        let user = username
      const res = await fetch('http://localhost:3001/authentication/getstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username : user}),
      });

      const r = await res.json();
      console.log(r);
      x = compileStatus(r);
      return x;
    }
    catch (err) {
       console.error(err.message);
    }
}

  function networkStatus(num) {
    let str;
    if (num == 0) {
      str = "Isolated";
    }
    else if (num < 20 && num > 0) {
      str = "Yellow";
    }
    else if (num >= 20 && num < 40) {
      str = "Orange";
    }
    else {
      str = "Red";
    }
    return str;
  }

  function positiveContact() {
      let str = "This user has come into contact with a COVID positive user. They are extremely unsafe to see.";
      return str;
  }

  async function checkUser(username){
      let user = username;
      let status = await getStatus(user);
      let notifications = [];
      if (status === "positive") {
          notifications.push("This user is COVID positive. Under no condition should you see them.")
      }
      else {
        let cache = await getCache();
        let primary = [];
        let secondary = [];
        let count = 0;
        let i;
        let j;
            
        for (i = 0; i < cache.length; i++) { //set up primary connections
            //console.log()
            if(cache[i].user1 === user && cache[i].user2 != user) { //all conn where main user is user1
            primary.push(cache[i].user2);
            count++;
            if (cache[i].user2status === "positive") {
                notifications.push("filler");
            }
            }
            
        }
        for (i = 0; i < cache.length; i++) { 
            for (j = 0; j < primary.length; j++) { 
            if(cache[i].user1 === primary[j] && primary[j] != user && cache[i].user2 != user) {
                secondary.push(cache[i].user2);
                count++;
                if (cache[i].user2status === "positive") {
                notifications.push("filler");
                }
            }
            }
        }

        for (i = 0; i < cache.length; i++) { //set up tertiary connections
            for (j = 0; j < secondary.length; j++) { 
            if(cache[i].user1 === secondary[j] && secondary[j] != user && cache[i].user2 != user) {
                count++;
                if (cache[i].user2status === "positive") {
                notifications.push("filler");
                }
                j = secondary.length; //removes chance of dupes
            }
            }
        }
        let str;
        if (notifications.length > 0) {
            notifications.length = 0; //resets notifs to remove fillers
            str = positiveContact();
        }
        else {
            let network = networkStatus(count);
            if (network === "Isolated") {
                str = "This user has no contacts with positive users and has no connections. They are very safe to see";
            }
            else if (network === "Yellow") {
                str = "This user has no contacts with positive users and has a relatively small netword of connections. They are fairly safe to see";
            }
            else if (network === "Orange") {
                str = "This user has no contacts with positive users and has a relatively extensive network of connection. They are probably safe to see";
            }
            else if (network === "Red"){
                str = "This user has no contacts with positive users but has a very extensive network of connection. They are probably not safe to see";
            }
        }
        notifications.length = 0; 
        notifications.push(str);
    } 
    return notifications;
  }


  
  const CheckUser = () => {
    const [notif, setNotif] = useState([]);
    const [inputs, setInputs] = useState({
      updateCheckUser: ""
    });
    
    const {updateCheckUser} = inputs;
    
    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        const cu = await checkUser(updateCheckUser);
        setNotif(cu);
    }
    return (
      //html here
      <Fragment>
        <div className = "CU">
          <div className = "populated">
            {notif.map((x) => <li key = "{x}">{x}</li>)}
          </div>
          {/* <button className = "btn btn-success btn-block" onClick = {onSubmitForm}> Check User! </button> */}
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              name="updateCheckUser"
              value={updateCheckUser}
              placeholder="username"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            <button className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
        
      </Fragment>
    )
    }

    export default CheckUser;
