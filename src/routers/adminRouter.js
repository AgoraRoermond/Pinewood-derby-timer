const express = require('express');
const adminController = require('../controllers/adminController');
const adminRouter = express.Router();

adminRouter.get('/times', adminController.getTimes);
adminRouter.get('/AssignTimes', adminController.getAssignTimes);
adminRouter.post('/AssignTimes', adminController.postAssignTimes);

module.exports = adminRouter;
