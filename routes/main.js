const express = require('express');
const router = express.Router();
const { validateUserRegister, validateUserImage, validateIfUserLoggedIn, validateTopic } = require("../middleware/main");
const { userRegister, loginUser, createTopic, getNotifications } = require("../controllers/main");

router.post("/register", validateUserRegister, validateUserImage, userRegister);
router.post("/login", loginUser);
router.post("/create-topic", validateIfUserLoggedIn, validateTopic, createTopic);
router.get("/get-notifications", validateIfUserLoggedIn, getNotifications);

module.exports = router;