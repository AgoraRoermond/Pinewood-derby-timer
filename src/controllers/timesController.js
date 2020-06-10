const sql = require('../db.js');
var x = 1;

async function getTimes(request, response) {
    times = await sql.query("SELECT * FROM times Where id='x' ");
    response.render('pages/times/times', { times });
}

async function saveTimes(timeList) {
  var studentId = 10227;
  for (i = 0; i < timeList.lenght; i++) {
    await sql.query("INSERT INTO times (studentId, studentTime) VALUES ("+ studentId + ", "+ timeList[i] +");");
  }
}

module.exports = {
    getTimes,
    saveTimes
}
