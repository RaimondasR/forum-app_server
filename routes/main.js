const express = require('express');
const router = express.Router();

const middle = require("../middleware/main");
const { validateUserRegister, validateUserImage } = require("../middleware/main");
const { userRegister, login } = require("../controllers/main");

router.post("/register", validateUserRegister, validateUserImage, userRegister);

router.post("/login", login);
// router.post("/create-auction", middle.validateAuction, createAuction)
// router.get("/auction/:url", getSingleAuction);

module.exports = router;