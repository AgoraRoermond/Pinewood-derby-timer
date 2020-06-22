const sql = require('../db.js');

async function showTimes(request, response) {
    allTimes = await sql.query("SELECT * FROM times");
    response.render('pages/admin/allTimes', { allTimes });
}
async function showAcounts(request, response) {
    acounts = await sql.query("SELECT * FROM times");
    response.render('pages/admin/acounts', { acounts });
}
async function showUsers(request, response) {
    response.render('pages/admin/users');

}
async function userData(request, response) {
    var userId = 10521;
    userData = await sql.query("SELECT * FROM times WHERE id=?", [userId]);
    response.render('pages/userId/users', { userData });
}

module.exports = {
    showTimes,
    showAcounts,
    showUsers,
    userData
}; 