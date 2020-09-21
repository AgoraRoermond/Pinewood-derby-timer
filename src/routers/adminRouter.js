const express = require('express');
const adminController = require('../controllers/adminController');
const adminRouter = express.Router();



adminRouter.get('/times', adminController.getTimes);

module.exports = adminRouter;