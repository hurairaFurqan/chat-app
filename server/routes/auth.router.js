const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");


router.post("/signUp", authController.SignUp);

router.post("/signIn", authController.SignIn);

module.exports = router;
