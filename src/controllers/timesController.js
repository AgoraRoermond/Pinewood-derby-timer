const sql = require('../db.js');

async function getTimes(request, response) {
  times = await sql.query("SELECT * FROM times");
  response.render('pages/times/times', {times});
}

async function saveValues(timeList) {
    for (i = 0; i < timeList.lenght; i++) {
        sql.query("INSERT INTO times " + timeList[i]);
    }
}

module.exports = {
  getTimes,
  saveValues
};
