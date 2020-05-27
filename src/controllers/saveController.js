const sql = require('../db.js')
const serial = require("../serial.js")

async function saveValues(timeList) {
    for (i = 0; i < timeList.lenght; i++) {
        sql.query("INSERT INTO students " + timeList[i]);
    }
}

module.exports = { saveValues };