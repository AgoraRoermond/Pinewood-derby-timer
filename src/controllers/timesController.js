const sql = require('../db.js');



async function getTimes(request, response) {
    var studentId = 3;
    times = await sql.query("SELECT * FROM times WHERE studentId=?", [studentId]);
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
