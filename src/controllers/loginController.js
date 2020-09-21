const sql = require('../db.js');


async function getLogin(request, response) {
    return response.render('pages/login/login')
}
async function postLogin(request, response) {
    var loginEmail = request.body.loginEmail;
    var loginPassword = request.body.loginPassword;
    console.log(loginEmail);
    console.log(loginPassword);
    if (loginEmail && loginPassword) {
        try {
            let results = await sql.query('SELECT email, is_teacher FROM accounts WHERE email = ? AND password = ?', [loginEmail, loginPassword]);
            //return response.redirect('/login/login');
            if (results.length == 0) response.send('Incorrect Username and/or Password!');

            request.session.loginEmail = loginEmail;
            request.session.isTeacher = results[0].is_teacher;
            return response.redirect('admin/times');
        } catch (e) {
            console.error(e);
            return response.send("An internal error occured");
        }
    } else {
        return response.send('Please enter Username and Password!');
    }
}


module.exports = {
    postLogin,
    getLogin,
}