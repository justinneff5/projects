const Pool = require('pg').Pool

const pool = new Pool({
  user: 'jneff',
  host: 'localhost',
  database: 'mod7',
  password: 'root',
  port: 5432,
});

module.exports = pool;
