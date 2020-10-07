const express = require('express');
const adminController = require('../controllers/adminController');
const adminRouter = express.Router();



adminRouter.get('/times', adminController.getTimes);
adminRouter.get('/assignTimes', adminController.getAssignTimes);
adminRouter.post('/assignTimes', adminController.postAssignTimes);
adminRouter.get('/accounts', adminController.getAccounts);
module.exports = adminRouter;
