var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AgoraRoermond",
  database: "Derby"
});

connection.connect(err => {
  if (err) throw err;
});

function query(query, args) {
  return new Promise((resolve, reject) => {
    connection.query(query, args, (error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    })
  })
}

module.exports = {
  query
};
