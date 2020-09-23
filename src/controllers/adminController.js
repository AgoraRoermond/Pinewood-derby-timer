const sql = require('../db.js');

async function getTimes(request, response) {
  var times = await sql.query("SELECT * FROM times");
  return response.render('pages/admin/times', {
    times,
  });
}

module.exports = {
  getTimes,
}