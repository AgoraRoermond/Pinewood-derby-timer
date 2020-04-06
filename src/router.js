const express = require('express')
const studentRouter = require('./routers/studentRouter');
const router = express.Router()

router.use('/students', studentRouter);

router.get('/', (request, response) => {
  response.render("pages/index");
})

module.exports = router;
