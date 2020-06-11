const sql = require('../db.js');


async function getTimes(request, response) {
    var studentId = 10521;
    times = await sql.query("SELECT * FROM times WHERE id=?", [studentId]);
    response.render('pages/times/times', { times });
}

async function saveTimes(timeList) {
    for (i = 0; i < timeList.lenght; i++) {
        await sql.query("INSERT INTO times " + timeList[i]);
    }
}

module.exports = {
    getTimes,
    saveTimes


}