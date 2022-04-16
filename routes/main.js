const express = require('express');
const router = express.Router();

const middle = require("../middleware/main");
const { registerUser, login, createAuction, getSingleAuction } = require("../controllers/main");
// const {registerUser, login, createPost, getSinglePost} = require("../controllers/main")

router.post("/register", middle.validateUser, registerUser);
router.post("/login", login);
router.post("/create-auction", middle.validateAuction, createAuction)
router.get("/auction/:url", getSingleAuction);
// router.post("/getAllPosts", middle.validatePost, createPost)
// router.post("/getuserposts/:username", middle.validatePost, createPost)


module.exports = router;