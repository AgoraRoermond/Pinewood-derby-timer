const sql = require("../db.js");
const serial = require("../serial.js");

async function getTimes(request, response) {
  var times = await sql.query("SELECT * FROM times");
  return response.render("pages/admin/times", {
    times,
  });
}

async function getAccounts(request, response) {
  var accounts = await sql.query("SELECT * FROM accounts");
  return response.render("pages/admin/accounts", {
    accounts,
  });
}

async function getAssignTimes(request, response) {
  var accountList = await sql.query("SELECT email, name FROM accounts");
  var unassignedTimes = serial.getLatestTimes();
  return response.render("pages/admin/asign-times", {
    unassignedTimes,
    accountList,
  });
}

async function postAssignTimes(request, response) {
  var studentMails = request.body.studentMail;
  var assignedTimes = serial.getLatestTimes();
  return Promise.all(
    studentMails.map((studentMail, index) => {
      if (!studentMail) return Promise.resolve();
      if (assignedTimes[index] === null) return Promise.resolve();
      return sql
        .query(
          "INSERT INTO `times` (`student_mail`,`time`,`raceId`) VALUES (?,?,?);",
          [studentMail, assignedTimes[index], serial.getRaceId()]
        )
        .then(() => serial.clearLatestTime(index));
    })
  )
    .then(() => response.redirect("/admin/assignTimes"))
    .catch(async () =>
      response.render("pages/admin/asign-times", {
        error: "Unknown email",
        unassignedTimes: assignedTimes,
        accountList: await sql.query("SELECT email, name FROM accounts"),
      })
    );
}

module.exports = {
  getTimes,
  getAccounts,
  getAssignTimes,
  postAssignTimes,
};
