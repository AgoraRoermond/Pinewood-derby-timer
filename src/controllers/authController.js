const sql = require("../db.js");

async function getLogin(request, response) {
  var times = await sql.query("SELECT * FROM times ORDER BY time ASC LIMIT 3");
  return response.render("pages/login/login", {
    times,
  });
}

async function postLogin(request, response) {
  const loginEmail = request.body.loginEmail;
  const loginPassword = request.body.loginPassword;

  if (!(loginEmail && loginPassword))
    return response.send("Please enter Username and Password!");

  try {
    const results = await sql.query(
      "SELECT email, is_teacher FROM accounts WHERE email = ? AND password = ?",
      [loginEmail, loginPassword]
    );
    if (results.length === 0)
      response.send("Incorrect Username and/or Password!");

    request.session.loginEmail = loginEmail;
    request.session.isTeacher = results[0].is_teacher;

    if (results[0].is_teacher) {
      return response.redirect("/admin/times");
    } else {
      return response.redirect("/student/dashboard");
    }
  } catch (e) {
    console.error(e);
    return response.send("An internal error occured");
  }
}

module.exports = {
  postLogin,
  getLogin,
};
