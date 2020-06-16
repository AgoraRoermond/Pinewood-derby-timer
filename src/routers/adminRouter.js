const express = require('express')
const timesController = require('../controllers/timesController');
const adminRouter = express.Router()

adminRouter.get('/all', timesController.showTimes);

module.exports = adminRouter;