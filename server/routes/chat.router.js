const express = require("express");
const protect = require("../middlerwares/protect");
const chatController = require("../controllers/chat.controller");
const router = express.Router();

// router.use(protect);
router.post("/msg", chatController.setUpChat);

module.exports = router;
