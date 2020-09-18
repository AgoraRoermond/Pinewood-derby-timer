const express = require('express');
const loginController = require('../controllers/loginController');
const loginRouter = express.Router();

loginRouter.get('/login', loginController.getLogin);
loginRouter.post('/login', loginController.postLogin);


module.exports = loginRouter;