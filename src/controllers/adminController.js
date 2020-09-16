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
  return response.render('pages/admin/AssignTimes', {
    unassignedTimes,
  });
}

async function postAssignTimes(request, response) {
  var studentMails = request.body.studentMail;
  var assignedTimes = serial.getLatestTimes();
  return Promise.all(studentMails.map((studentMail, index) => {
      if (!studentMail) return Promise.resolve();
      if (assignedTimes[index] == null) return Promise.resolve();
      return sql.query("INSERT INTO `times` (`student_mail`,`time`) VALUES (?,?);", [studentMail, assignedTimes[index]])
        .then(() => serial.clearLatestTime(index));
    }))
    .then(() => response.redirect("/admin/times"))
    .catch(error => response.render("pages/admin/assignTimes", {
      error: "Unknown email",
      unassignedTimes: assignedTimes,
    }));
}


module.exports = {
  getTimes,
  getAssignTimes,
  postAssignTimes,
}
