const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/getAllConnections", async (req, res) => {
    const { user1 } = req.body;
    try {
      const retConnections = await pool.query("SELECT user2 from connections where user1 = $1", [user1]);
      res.json(retConnections.rows);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = router;