const sql = require('../db.js');

async function getAllStudents(request, response) {
  console.log("getAllStudents");
  result = await sql.query("SELECT * FROM students");
  response.send(result);
}

module.exports = {
  getAllStudents
};
