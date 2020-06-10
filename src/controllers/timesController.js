const sql = require('../db.js');
var x = 1;

async function getTimes(request, response) {
    times = await sql.query("SELECT * FROM times Where id='x' ");
    response.render('pages/times/times', { times });
}

async function saveTimes(timeList) {
  studentId = Math.floor(Math.random() * 200000);
  console.log(timeList);
  console.log(studentId);
  timeList.forEach((time, i) => {
    await sql.query("INSERT INTO times (studentId, studentTime) VALUES (" + studentId + ", " + time + ");");
    console.log(time);
  });

}

module.exports = {
    getTimes,
    saveTimes
}
