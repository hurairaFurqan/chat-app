const express = require("express");

const protect = require("../middlerwares/protect");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.use(protect);

router.route("/getme").get(userController.getMe, userController.getUser);
module.exports = router;
