const express = require('express')
const adminController = require('../controllers/adminController');
const adminRouter = express.Router()

adminRouter.get('/allTimes', adminController.showTimes);
adminRouter.get('/acounts', adminController.showAcounts);

module.exports = adminRouter;