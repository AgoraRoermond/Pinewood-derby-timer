const express = require('express')
const adminRouter = require('./routers/adminRouter');
const router = express.Router()

router.use('/admin', adminRouter);

router.get('/', (request, response) => {
  response.render("pages/index");
})

module.exports = router;
