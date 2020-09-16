const sql = require('../db.js');
const serial = require('../serial.js');

async function getTimes(request, response) {
  var times = await sql.query("SELECT * FROM times");
  return response.render('pages/admin/times', {
    times,
  });
}

function getAssignTimes(request, response) {
  var unassignedTimes = serial.getLatestTimes();
  return response.render('pages/admin/getAssignTimes', {
    unassignedTimes,
  });
}

async function postAssignTimes(request, response) {
  var {studentMail0, studentMail1, studentMail2} = request.body;
  var assignedTimes = serial.getLatestTimes();
  // console.log(studentMail0);
  // console.log(studentMail1);
  // console.log(studentMail2);
  await sql.query("INSERT INTO `times` (`student_mail`,`time`) VALUES (?,?);", [studentMail0, assignedTimes[0]]);
  await sql.query("INSERT INTO `times` (`student_mail`,`time`) VALUES (?,?);", [studentMail1, assignedTimes[1]]);
  await sql.query("INSERT INTO `times` (`student_mail`,`time`) VALUES (?,?);", [studentMail2, assignedTimes[2]]);
  return response.render('pages/index');
}



module.exports = {
  getTimes,
  getAssignTimes,
  postAssignTimes,
}
