const express = require('express');
const router = express.Router();
const { validateUserRegister, validateUserImage, validateIfUserLoggedIn, validateTopic } = require("../middleware/main");
const { userRegister, userLogin, createTopic, getNotifications } = require("../controllers/main");

router.post("/register", validateUserRegister, validateUserImage, userRegister);
router.post("/login", userLogin);
router.post("/create-topic", validateIfUserLoggedIn, validateTopic, createTopic);
router.get("/get-notifications", validateIfUserLoggedIn, getNotifications);

module.exports = router;