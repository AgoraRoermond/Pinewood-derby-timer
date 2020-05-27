const sql = require('../src/db.js')
const serial = require("../src/serial.js")

async function saveTimes() {
    sql.query("INSERT INTO students " + serial.time1);
    sql.query("INSERT INTO students " + serial.time2);
    sql.query("INSERT INTO students " + serial.time3);
}

module.exports = { saveTimes };