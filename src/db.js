var mysql = require('mysql');

if(process.env.NO_DATABASE) {
  module.exports = {
    query: () => [],
  };
  return;
}

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AgoraRoermond",
  database: "Derby"
});

let lastQueryTime = -1;

connection.connect(err => {
  if (err) throw err;
  lastQueryTime = (new Date()).getTime();
});

function query(query, args) {
  return new Promise((resolve, reject) => {
    if (lastQueryTime < 0) return reject("Not connected");
    connection.query(query, args, (error, rows) => {
      if (error) return reject(error);
      lastQueryTime = (new Date()).getTime();
      resolve(rows);
    })
  })
}

setInterval(async () => {
  let currentTime = (new Date()).getTime();
  if (lastQueryTime + 60000 < currentTime) { // If last query is more then one minute ago
    try {
      await query("SELECT 1");
    } catch (e) {
      throw e;
    }
  }
}, 60000); // Execute once every minute

module.exports = {
  query
};