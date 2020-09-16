const express = require('express');
const adminController = require('../controllers/adminController');
const adminRouter = express.Router();

adminRouter.get('/times', adminController.getTimes);
adminRouter.get('/getAssignTimes', adminController.getAssignTimes);
adminRouter.post('/getAssignTimes', adminController.postAssignTimes);

module.exports = adminRouter;
