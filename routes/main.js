const express = require('express');
const router = express.Router();
const { validateUserRegister, validateUserImage, validateIfUserLoggedIn } = require("../middleware/main");
const { userRegister, login, createTopic } = require("../controllers/main");

router.post("/register", validateUserRegister, validateUserImage, userRegister);
router.post("/login", login);
router.post("/create-topic", validateIfUserLoggedIn, createTopic);

module.exports = router;