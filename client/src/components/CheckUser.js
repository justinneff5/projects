// import React, { Fragment, useState } from "react";
// import { Link, Redirect } from "react-router-dom";

// // import { toast } from "react-toastify";

// //refresh doesn't work

// const CheckUser = (updateConnects, connects) => {
//     // const [myConnects, updateMyConnects] = useState(connects)
//     const [inputs, setInputs] = useState({
//         user1: "",
//         user2: "",
//         user3: ""
//       });
//     const { user1, user2, user3 } = inputs;

//     const onChange = e =>
//     setInputs({ ...inputs, [e.target.name]: e.target.value });

// const onSubmitFormA = async e => {
//     e.preventDefault();
//     try {
//         const body = { user1: localStorage.getItem("token"), user2 };
//         const response = await fetch(
//           "http://localhost:3001/other/add",
//           {
//             method: "POST",
//             headers: {
//               "Content-type": "application/json"
//             },
//             body: JSON.stringify(body)
//           }
//         );
//         // if (response.status === 200) {
//         //   updateConnects(myConnects);
//         // }
//       } catch (err) {
//         console.error(err.message);
//       }
//   };

//   const onSubmitFormB = async e => {
//     e.preventDefault();
//     try {
//         const body = { user1: localStorage.getItem("token"), user2, user3 };
//         const response = await fetch(
//           "http://localhost:3001/other/edit",
//           {
//             method: "POST",
//             headers: {
//               "Content-type": "application/json"
//             },
//             body: JSON.stringify(body)
//           }
//         );
//         if (response.status === 200) {
//           updateConnects(connects);
//         }
//       } catch (err) {
//         console.error(err.message);
//       }
//   };

//   const onSubmitFormC = async e => {
//     e.preventDefault();
//     try {
//         const body = { user1: localStorage.getItem("token"), user2 };
//         const response = await fetch(
//           "http://localhost:3001/other/delete",
//           {
//             method: "POST",
//             headers: {
//               "Content-type": "application/json"
//             },
//             body: JSON.stringify(body)
//           }
//         );
//         // if (response.status === 200) {
//         //   updateConnects(myConnects);
//         // }
//       } catch (err) {
//         console.error(err.message);
//       }
//   };

//   return (
//     <Fragment>
//     <h3 className="mt-5">Check if user is safe to see! </h3>
//     <form onSubmit={onSubmitFormA}>
//       <input
//         type="text"
//         name="user2"
//         value={user2}
//         placeholder="username"
//         onChange={e => onChange(e)}
//         className="form-control my-3"
//       />
//       <button className="btn btn-success btn-block">Submit</button>
//     </form>
//   </Fragment>
//   );
// };

// export default CheckUser;