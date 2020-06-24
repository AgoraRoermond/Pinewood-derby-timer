const sql = require('../db.js');

async function showTimes(request, response) {
    allTimes = await sql.query("SELECT * FROM times");
    response.render('pages/admin/allTimes', { allTimes });
}
async function showAcounts(request, response) {
    acounts = await sql.query("SELECT * FROM times");
    response.render('pages/admin/acounts', { acounts });
}
async function getUser(request, response) {
    getAcounts = await sql.query("SELECT studentId FROM times");
    response.render('pages/admin/user', { getAcounts });

}
async function userData(request, response) {
    var userId = 10521;
    userData = await sql.query("SELECT * FROM times WHERE id=?", [userId]);
    response.render('pages/admin/user', { userData });
}
async function getNewUser(request, response) {
    response.render('pages/admin/newUser');

}
async function postNewUser(request, response) {
    var studentName = request.body.studentName;
    console.log(studentName);
    response.redirect('/admin/user');

}

module.exports = {
    showTimes,
    showAcounts,
    getUser,
    userData,
    getNewUser,
    postNewUser
};