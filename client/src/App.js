import React, {useState, useEffect} from 'react';

function App() {
  const [users, setUsers] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setUsers(data);
      });
  }
  function createUser() {
    let username = prompt('Enter username');
    let password = prompt('Enter password');
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }
  // function deleteMerchant() {
  //   let id = prompt('Enter merchant id');
  //   fetch(`http://localhost:3001/merchants/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(data => {
  //       alert(data);
  //       getMerchant();
  //     });
  // }
  return (
    <div>
      {users ? users : 'There is no user data available'}
      <br />
      <button onClick={createUser}>Add user</button>
      <br />
    </div>
  );
}
export default App;