const sql = require("../db.js");

async function getTimes(request, response) {
  const loginEmail = request.session.loginEmail;
  const times = await sql.query("SELECT * FROM times WHERE student_mail = ?", [
    loginEmail,
  ]);
  response.render("pages/student/student", { times });
}

module.exports = {
  getTimes,
};
