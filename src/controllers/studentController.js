const sql = require("../db.js");
const serial = require("../serial");

async function getDashboard(request, response) {
  const loginEmail = request.session.loginEmail;
  const times = await sql.query("SELECT * FROM times WHERE student_mail = ?", [
    loginEmail,
  ]);
  response.render("pages/student/student", { times });
}

function getJoinRace(request, response) {
  return response.render("pages/student/joinRace");
}

async function postJoinRace(request, response) {
  const loginEmail = request.session.loginEmail;
  const { raceId, trackId: trackIdString } = request.body;
  const trackId = parseInt(trackIdString);
  if (raceId !== serial.getRaceId())
    return response.render("pages/student/joinRace", {
      error: "Invalid race id",
    });
  if (trackId < 0 || trackId > 3)
    return response.render("pages/student/joinRace", {
      error: "Invalid track id",
    });
  if (!serial.joinRace(trackId, loginEmail))
    return response.render("pages/student/joinRace", {
      error: "Track already claimed",
    });

  return response.redirect("/student/result");
}

function getResult(request, response) {
  return response.send("Here are the results");
}

async function getResultApi(request, response) {
  const results = await sql.query(
    "SELECT `student_mail`, `time` FROM `times` WHERE raceId=? ORDER BY time ASC",
    [serial.getRaceId()]
  );
  const position = results
    .map((result) => result.student_mail)
    .indexOf(request.session.loginEmail);
  if (position < 0) return response.json({ gameFinished: false });
  return response.json({ gameFinished: true, position });
}


async function getTimes(request, response) {
  var timeList = await sql.query("SELECT time as tijd, DATE(timestamp) FROM times");

  return response.render("pages/student/chart", {
      timeList,

  });
}






module.exports = {
  getDashboard,
  getJoinRace,
  postJoinRace,
  getResult,
  getResultApi,
  getTimes,

};
