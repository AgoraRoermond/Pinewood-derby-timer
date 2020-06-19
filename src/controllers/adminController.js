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


module.exports = {
    showTimes,
    showAcounts,
    showUsers
}; 