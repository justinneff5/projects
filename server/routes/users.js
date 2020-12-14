const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");


router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, bcryptPassword]
    );


    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    // const jwtToken = jwtGenerator(user.rows[0].user_id);
    // return res.json({ jwtToken });
    res.json(user.rows[0]);
    // res.status(200).send("Test");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/dashboard", async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username] 
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/status", async (req, res) => {
  const { username, status } = req.body;
  try {
    const user = await pool.query("UPDATE users SET status = $2 where username = $1",
    [username, status]
    );
    // res.json(user.rows[0]);
      res.status(200).send("Test");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/getstatus", async (req, res) => {
  const { username } = req.body;
  try {
    const retStatus = await pool.query("SELECT status from users where username = $1", [username]);
    res.json(retStatus.rows[0]);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/getrisk", async (req, res) => {
  const { username } = req.body;
  try {
    const retRisk = await pool.query("SELECT risk from users where username = $1", [username]);
    res.json(retRisk.rows[0]);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.post("/risk", async (req, res) => {
  const { username, risk } = req.body;
  try {
    const user = await pool.query("UPDATE users SET risk = $2 where username = $1",
    [username, risk]
    );
    // res.json(user.rows[0]);
      res.status(200).send("Test");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// router.post("/verify", (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;