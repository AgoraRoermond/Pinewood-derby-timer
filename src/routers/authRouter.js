const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);


module.exports = authRouter;