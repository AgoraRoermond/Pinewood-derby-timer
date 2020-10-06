const express = require('express')
const adminRouter = require('./routers/adminRouter');
const authRouter = require('./routers/authRouter');
const studentRouter = require('./routers/studentRouter');
const router = express.Router()

router.use('/admin', adminRouter);

router.use('/auth', authRouter);
router.use('/student', studentRouter);

router.get('/', (request, response) => {
  response.redirect("/auth/login");
})

module.exports = router;
