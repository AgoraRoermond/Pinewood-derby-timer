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
        sql.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [loginPassword, loginEmail], function(error, results, fields) {
            //return response.redirect('/login/login');
            if (results.length > 0) {
                request.session.loginEmail = true;
                request.session.loginEmail = loginEmail;
                response.redirect('admin/times');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
}



module.exports = {
    postLogin,
    getLogin
}
