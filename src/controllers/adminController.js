const sql = require('../db.js');

async function showTimes(request, response) {
    admin = await sql.query("SELECT * FROM times");
    response.render('pages/admin/alladmin', { admin });
}


module.exports = {
    showTimes
};