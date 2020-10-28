const sql = require("../db.js");
const bcrypt = require("bcrypt");

async function getLogin(request, response) {
  var times = await sql.query("SELECT * FROM times ORDER BY time ASC LIMIT 3");
  return response.render("pages/auth/login", {
    times,
  });
}

async function postLogin(request, response) {
  const loginEmail = request.body.loginEmail;
  const loginPassword = request.body.loginPassword;

  if (!loginEmail || !loginPassword)
    return response.send("Please enter Username and Password!");

  try {
    const results = await sql.query(
      "SELECT email, is_teacher, password FROM accounts WHERE email = ?",
      [loginEmail]
    );
    if (
      results.length === 0 ||
      !(await bcrypt.compare(loginPassword, results[0].password))
    )
      return response.render("pages/auth/login", {
        error: "Incorrect Username and/or Password!",
        email: loginEmail,
        times: await sql.query("SELECT * FROM times ORDER BY time ASC LIMIT 3"),
      });

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
