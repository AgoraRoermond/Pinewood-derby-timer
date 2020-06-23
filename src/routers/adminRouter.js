const express = require('express')
const adminController = require('../controllers/adminController');
const adminRouter = express.Router()

adminRouter.get('/allTimes', adminController.showTimes);
adminRouter.get('/acounts', adminController.showAcounts);
adminRouter.get('/users', adminController.showUsers);
adminRouter.get('/usersData', adminController.userData);

module.exports = adminRouter;