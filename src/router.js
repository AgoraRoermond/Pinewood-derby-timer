const express = require("express");
const adminRouter = require("./routers/adminRouter");
const authRouter = require("./routers/authRouter");
const studentRouter = require("./routers/studentRouter");
const apiRouter = require("./routers/apiRouter");
const router = express.Router();

function requireTeacher(req, res, next) {
  if (true) {
    next();
  } else {
    res.send("premission denied");
  }
}

router.use("/admin", requireTeacher, adminRouter);
router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/api", apiRouter);

router.get("/", (request, response) => {
  response.redirect("/auth/login");
});

module.exports = router;
//req.session.isTeacher
