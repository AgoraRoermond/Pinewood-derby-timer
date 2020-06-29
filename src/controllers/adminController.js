const sql = require('../db.js');

async function showTimes(request, response) {
  allTimes = await sql.query("SELECT * FROM times");
  response.render('pages/admin/allTimes', {
    allTimes
  });
}
async function showAcounts(request, response) {
  acounts = await sql.query("SELECT * FROM times");
  response.render('pages/admin/acounts', {
    acounts
  });
}
async function getUser(request, response) {
  getAcounts = await sql.query("SELECT distinct(studentName) FROM times");
  response.render('pages/admin/user', {
    getAcounts
  });

}
async function userData(request, response) {
  var userId = 10521;
  userData = await sql.query("SELECT * FROM times WHERE id=?", [userId]);
  response.render('pages/admin/user', {
    userData
  });
}
async function getNewUser(request, response) {
  response.render('pages/admin/newUser');

}
async function postNewUser(request, response) {
  var studentName = request.body.studentName;
  console.log(studentName);
    postNewUser = await sql.query("INSERT INTO times (studentName) VALUES (?)", [studentName]);
    console.log(postNewUser);
  response.redirect('/admin/user');
}
async function postNewTeacher(request, response) {
  var teacherName = request.body.teacherName;
  console.log(teacherName);
    postNewTeacher = await sql.query("INSERT INTO teacher (teacherName) VALUES (?)", [teacherName]);
    console.log(postNewTeacher);
  response.redirect('page/admin/teacher');
}

async function getTeacher(request, response) {
  getTeacher = await sql.query("SELECT (teacherName) FROM teacher");
  response.render('pages/admin/newUser',{
    getTeacher
  });
}
6
  async function postNewTeacherTime(request, response) {
    var teacherName = request.body.teacherName;
    var time = request.body.time;
    var attempt = request.body.attempt;
    console.log(studentName);
      postNewTeacherTime = await sql.query("INSERT INTO teacher (teacherid,time,attempt) VALUES (?,?,?)", [teacherName,time,attempt]);
      console.log(postNewTeacher);
    response.redirect('page/admin/teacherTime');
  
  }
  async function getTeacherTimes(request, response) {
    getTeacherTime = await sql.query("SELECT * FROM teacher");
    response.render('pages/admin/ttimes',{
      getTeacherTime
    });
  }
  
  module.exports = {
  showTimes,
  showAcounts,
  getUser,
  userData,
  getNewUser,
  postNewUser,
  postNewTeacher,
  getTeacher,
  getTeacherTimes,
  postNewTeacherTime,
}