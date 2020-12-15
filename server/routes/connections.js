const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/getAllConnections", async (req, res) => {
    const { user1, homeuser, primuser } = req.body;
    try {
      // let retConnections = await pool.query("SELECT user2 from connections where user1 = $1", [user1]);
      const retConnections = await pool.query("SELECT user2 from connections where user1 = $1 AND NOT user2 = $2 AND NOT user2 = $3", [user1, homeuser, primuser]);
      res.json(retConnections.rows);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/add", async (req, res) => {
    const { user1, user2 } = req.body;
  
    try {
      // const user = await pool.query("SELECT user1 FROM connections WHERE user2 = $1", [
      //   user1
      // ]);

      // user = x;

      // if (user.rows.length > 0) {
      //   let random = await pool.query(
      //   "INSERT INTO connections (user1, user2) VALUES ($1, $2) RETURNING *",
      //   [user1, x]
      //   );
      // }
      
      let newUser = await pool.query(
        "INSERT INTO connections (user1, user2) VALUES ($1, $2) RETURNING *",
        // "INSERT INTO connections (user2status) SELECT status FROM users where username = $2",
        [user1, user2]
      );

      let random = await pool.query(
        // "SELECT status FROM users where username = $1",
        "UPDATE connections SET user2status = (SELECT status FROM users where username = $2) where user1 = $1 AND user2 = $2",
        [user1, user2]
      );


      // let check = await pool.query(
      //   "INSERT INTO connections (user2status) VALUES ($1)",
      //   // "INSERT INTO connections (user2status) SELECT status FROM users where username = $1",
      //   [random]
      // );
      res.status(200).send("Test");
      // res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/edit", async (req, res) => {
    const { user1, user2, user3 } = req.body;
  
    try {
      let random = await pool.query(
        "UPDATE connections SET user2status = (SELECT status FROM users where username = $3) where user1 = $1 AND user2 = $2",
        [user1, user2, user3]
      );

      let newUser = await pool.query(
        "UPDATE connections set user2 = $3 where user2 = $2 AND user1 = $1",
        // update connections set user2 = 'ab' where user2 = 'james';
        [user1, user2, user3]
      );
      
      res.status(200).send("Test");
      // res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/delete", async (req, res) => {
    const { user1, user2 } = req.body;
  
    try {
      let newUser = await pool.query(
        "DELETE from connections WHERE user1 = $1 AND user2 = $2",
        [user1, user2]
      );
      // res.status(200).send("Test");
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/cacheDatabase", async (req, res) => {
    const {status} = req.body;
    try {
      const cache = await pool.query(
        "Select * from connections WHERE user2status = $1",
        [status]
      );
      // res.status(200).send("Test");
      res.json(cache.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/updateU2status", async (req, res) => {
    const {user, userStatus} = req.body;
    try {
      let cache = await pool.query(
        "update connections set user2status = $1 where user2 = $2",
        [user, userStatus]
      );
      // res.status(200).send("Test");
      res.json(cache.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


  


module.exports = router;