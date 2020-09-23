const express = require('express')
const adminRouter = require('./routers/adminRouter');
const authRouter = require('./routers/authRouter');
const router = express.Router()

router.use('/admin', adminRouter);

router.use('/login', authRouter);

router.get('/', (request, response) => {
  response.render("pages/index");
})

module.exports = router;