const sql = require('../db.js');


async function getLogin(request, response) {
  var times = await sql.query("SELECT * FROM times");
  return response.render('pages/index', {
    times,
  });
}

async function postLogin(request, response) {
  var loginEmail = request.body.loginEmail;
  var loginPassword = request.body.loginPassword;

  if (!(loginEmail && loginPassword)) return response.send('Please enter Username and Password!');

  try {
    let results = await sql.query('SELECT email, is_teacher FROM accounts WHERE email = ? AND password = ?', [loginEmail, loginPassword]);
    if (results.length == 0) response.send('Incorrect Username and/or Password!');

    request.session.loginEmail = loginEmail;
    request.session.isTeacher = results[0].is_teacher;

    if (results[0].is_teacher) {
      return response.redirect('/admin/times');
    } else {
      return response.redirect('/student/student');
    }
  } catch (e) {
    console.error(e);
    return response.send("An internal error occured");
  }
}





module.exports = {
  postLogin,
  getLogin,
}
