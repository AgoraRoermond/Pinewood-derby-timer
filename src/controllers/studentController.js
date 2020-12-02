const sql = require("../db.js");
const serial = require("../serial");

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
  return response.render("pages/student/results");
}

async function getResultApi(request, response) {
  const results = await sql.query(
    "SELECT `accounts`.`name`, `time` FROM `times` INNER JOIN `accounts` ON `times`.`student_mail` = `accounts`.`email` WHERE raceId=? ORDER BY time ASC",
    [serial.getRaceId()]
  );
  if (results.length === 0)
    return response.json({
      gameFinished: false,
    });
  return response.json({
    gameFinished: true,
    first: results[0] && {
      name: results[0].name,
      time: results[0].time,
    },
    second: results[1] && {
      name: results[1].name,
      time: results[1].time,
    },
    third: results[2] && {
      name: results[2].name,
      time: results[2].time,
    },
  });
}

async function getDashboard(request, response) {
  var loginEmail = request.session.loginEmail;
  var timeList = await sql.query(
    "SELECT time, DATE(timestamp) AS timestamp FROM times WHERE student_mail = ?",
    [loginEmail]
  );

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
};
