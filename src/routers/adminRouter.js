const express = require('express')
const timesController = require('../controllers/adminController');
const adminRouter = express.Router()

adminRouter.get('/admin', timesController.showTimes);

module.exports = adminRouter;