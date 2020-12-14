const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/getAllConnections", async (req, res) => {
    const { user1, homeuser, primuser } = req.body;
    try {
      const retConnections = await pool.query("SELECT user2 from connections where user1 = $1 AND NOT user2 = $2 AND NOT user2 = $3", [user1, homeuser, primuser]);
      res.json(retConnections.rows);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = router;