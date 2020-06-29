const express = require('express')
const adminController = require('../controllers/adminController');
const adminRouter = express.Router()

adminRouter.get('/allTimes', adminController.showTimes);
adminRouter.get('/acounts', adminController.showAcounts);
adminRouter.get('/user', adminController.getUser);
adminRouter.get('/usersData', adminController.userData);
adminRouter.get('/user/new', adminController.getNewUser);
adminRouter.post('/user/new', adminController.postNewUser);

 adminRouter.get('/teacherTimes', adminController.getTeacherTimes);
adminRouter.post('/ttimes/new', adminController.postNewTeacherTime);
 adminRouter.get('/teacher', adminController.getTeacher);
 adminRouter.post('/teacher', adminController.postNewTeacher);

module.exports = adminRouter;

