const express = require('express')
const timesController = require('../controllers/timesController');
const timesRouter = express.Router()

timesRouter.get('/all', timesController.getTimes);

module.exports = timesRouter;
