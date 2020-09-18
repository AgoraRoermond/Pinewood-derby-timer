const express = require('express')
const adminRouter = require('./routers/adminRouter');
const loginRouter = require('./routers/loginRouter');
const router = express.Router()

router.use('/admin', adminRouter);

router.use('/login', loginRouter);

router.get('/', (request, response) => {
    response.render("pages/index");
})

module.exports = router;