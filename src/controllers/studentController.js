const sql = require('../db.js');
const session = require('express-session');

//async function getTimes(request, response) {
//  var loginEmail = request.session.loginEmail;

  //try {
    //var loginEmail = await sql.query('SELECT * FROM times WHERE student_mail = ?', [loginEmail]);
    //return response.render('pages/student/student', {
      //loginEmail,
    //});

    async function getTimes(request, response) {
        var loginEmail = request.session.loginEmail
        getTimes = await sql.query('SELECT * FROM times WHERE student_mail = ?', [loginEmail]);
        response.render('pages/student/student', { getTimes });
    }

     // catch (e) {
      //console.error(e);
      //return response.send("An internal error occured");
  //  }




module.exports = {
getTimes,


}
