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

function getResultApi(request, response) {
  // TODO: implement
  return response.json({ success: true });
}

module.exports = {
  getDashboard,
  getJoinRace,
  postJoinRace,
  getResult,
  getResultApi,
};
