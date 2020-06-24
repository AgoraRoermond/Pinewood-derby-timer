const express = require('express')
const adminController = require('../controllers/adminController');
const adminRouter = express.Router()

adminRouter.get('/allTimes', adminController.showTimes);
adminRouter.get('/acounts', adminController.showAcounts);
adminRouter.get('/users', adminController.showUsers);
adminRouter.get('/usersData', adminController.userData);
adminRouter.get('/user/new', adminController.getNewUser);
adminRouter.post('/user/new', adminController.postNewUser);

module.exports = adminRouter;
