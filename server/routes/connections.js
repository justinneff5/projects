const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/getAllConnections", async (req, res) => {
    const { user1 } = req.body;
    try {
      let retConnections = await pool.query("SELECT user2 from connections where user1 = $1", [user1]);
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
      let newUser = await pool.query(
        "INSERT INTO connections (user1, user2) VALUES ($1, $2) RETURNING *",
        [user1, user2]
      );
      // res.status(200).send("Test");
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/edit", async (req, res) => {
    const { user1, user2, user3 } = req.body;
  
    try {
      let newUser = await pool.query(
        "UPDATE connections set user2 = $3 where user2 = $2 AND user1 = $1",
        // update connections set user2 = 'ab' where user2 = 'james';
        [user1, user2, user3]
      );
      // res.status(200).send("Test");
      res.json(newUser.rows[0]);
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
  


module.exports = router;