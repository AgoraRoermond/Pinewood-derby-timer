const sql = require('../db.js');
var x = 1;

async function getTimes(request, response) {
    times = await sql.query("SELECT * FROM times Where id='x' ");
    response.render('pages/times/times', { times });
}

async function saveTimes(timeList) {
    for (i = 0; i < timeList.lenght; i++) {
        sql.query("INSERT INTO times " + timeList[i]);
    }
}

module.exports = {
    getTimes,
    saveValues,
}
