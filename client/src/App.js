// import React, {useState, useEffect} from 'react';

// function App() {
//   const [users, setUsers] = useState(false);
//   useEffect(() => {
//     getUsers();
//   }, []);
//   function getUsers() {
//     fetch('http://localhost:3001')
//       .then(response => {
//         return response.text();
//       })
//       .then(data => {
//         setUsers(data);
//       });
//   }
//   function createUser() {
//     let username = prompt('Enter username');
//     let password = prompt('Enter password');
//     fetch('http://localhost:3001/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({username, password}),
//     })
//       .then(response => {
//         return response.text();
//       })
//       .then(data => {
//         alert(data);
//         getUsers();
//       });
//   }
//   // function deleteMerchant() {
//   //   let id = prompt('Enter merchant id');
//   //   fetch(`http://localhost:3001/merchants/${id}`, {
//   //     method: 'DELETE',
//   //   })
//   //     .then(response => {
//   //       return response.text();
//   //     })
//   //     .then(data => {
//   //       alert(data);
//   //       getMerchant();
//   //     });
//   // }
//   return (
//     <div>
//       {users ? users : 'There is no user data available'}
//       <br />
//       <button onClick={createUser}>Add user</button>
//       <br />
//     </div>
//   );
// }
// export default App;

import React, { Fragment, useState, useEffect } from "react";

// import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// import { toast } from "react-toastify";

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

// toast.configure();

function App() {
  // const checkAuthenticated = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3001/authentication/verify", {
  //       method: "POST",
  //       headers: { jwt_token: localStorage.token }
  //     });

  //     const parseRes = await res.json();

  //     parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // useEffect(() => {
  //   checkAuthenticated();
  // }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") !== null);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;