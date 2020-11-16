const sql = require("../db.js");
const serial = require("../serial.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

async function getNewUser(request, response) {
  response.render('pages/admin/newUser');
}

async function postNewUser(request, response) {
  const accountName = request.body.accountName;
  const accountEmail = request.body.accountEmail;
  const accountRole = request.body.accountRole;
  const accountPass = await bcrypt.hash(request.body.accountPass, saltRounds);
  await sql.query("INSERT INTO `accounts` (`email`,`name`, `is_teacher`,`password`) VALUES(?,?,?,?)", [accountEmail, accountName, accountRole, accountPass]);
  response.redirect('/admin/accounts');
}

async function postDeleteAccount(request, response) {
  const email = request.body.email;
  await sql.query("DELETE FROM times WHERE student_mail = ?;", [email]);
  await sql.query("DELETE FROM accounts WHERE email = ?;", [email]);
  response.redirect('/admin/accounts');
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
      }));
}

module.exports = {
  getTimes,
  getAccounts,
  getNewUser,
  postNewUser,
  getAssignTimes,
  postAssignTimes,
  postDeleteAccount,
};
