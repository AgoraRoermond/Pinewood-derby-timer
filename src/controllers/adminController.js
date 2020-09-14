const sql = require('../db.js');
const serial = require('../serial.js');

async function getTimes(request, response) {
  var times = await sql.query("SELECT * FROM times");
  return response.render('pages/admin/times', {
    times,
  });
}

async function getAssignTimes(request, response) {
  var unassignedTimes = serial.getLatestTimes();
  return response.render('pages/admin/getAssignTimes', {
    unassignedTimes,
  });
}



module.exports = {
  getTimes,
  getAssignTimes,
}
