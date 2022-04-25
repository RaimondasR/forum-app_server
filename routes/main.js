const express = require('express');
const router = express.Router();
const { validateUserRegister, validateUserImage } = require("../middleware/main");
const { userRegister, login } = require("../controllers/main");

router.post("/register", validateUserRegister, validateUserImage, userRegister);
router.post("/login", login);
router.post("/create-topic", createTopic);

module.exports = router;