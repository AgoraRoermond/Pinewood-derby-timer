const sql = require('../db.js');

async function getAllStudents(request, response) {
    students = await sql.query("SELECT * FROM students");
    response.render('pages/students/allStudents', { students });
}


module.exports = {
    getAllStudents
};
