const sql = require('../db.js');

async function getTimes(request, response) {
  times = await sql.query("SELECT * FROM times");
  response.render('pages/times/times', {times});
}

module.exports = {
  getTimes
};
