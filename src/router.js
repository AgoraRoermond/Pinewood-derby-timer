const express = require('express')
const sql = require('./db.js');
const router = express.Router()

// respond with "hello world" when a GET request is made to the homepage
router.get('/', async (req, res) => {
  res.send('hello world');
  result = await sql.query("SELECT * FROM students");
  console.log(result);
})

module.exports = router;
