const Pool = require('pg').Pool
const pool = new Pool({
  user: 'jneff',
  host: 'localhost',
  database: 'mod7',
  password: 'root',
  port: 5432,
});

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { username, password } = body
      pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password], (error, results) => { //used to have a RETURNING * at end of sql statement
        if (error) {
          reject(error)
        }
        resolve(`A new user has been added added: `) //${results.rows[0]} was after
      })
    })
  }
//   const deleteUser = () => {
//     return new Promise(function(resolve, reject) {
//       const id = parseInt(request.params.id)
//       pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
//         if (error) {
//           reject(error)
//         }
//         resolve(`Merchant deleted with ID: ${id}`)
//       })
//     })
//   }
  
  module.exports = {
    getUsers,
    createUser,
    //deleteMerchant,
  }