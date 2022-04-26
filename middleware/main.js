const forumUserDb = require("../models/userSchema");
const forumTopicDb = require("../models/topicSchema");

module.exports = {
    validateUserRegister: async (req, res, next) => {
        const {userName, password1, password2} = req.body;

        const userExists = await forumUserDb.findOne({userName});
        if (userExists) {
            return res.send({error: true, message: "error: username is already taken"})
        }
        if(userName.length > 20 || userName.length < 3) {
            return res.send({error: true, message: "error: bad username"});
        }
        if(password1 !== password2 || password1.length > 20 || password1.length < 3) {
            return res.send({error: true, message: "error: bad password"});
        }
        next();
    },
    validateUserImage: async (req, res, next) => {
      const {userImage} = req.body;

      if (userImage.length === 0) {
        return next();
      }

      if (userImage.length > 0) {
        if (userImage.includes("jpeg") || userImage.includes("jpg") || userImage.includes("gif") || userImage.includes("png")) {
        return next();
        }
        res.send({success: false, message: "error: bad image file format"})
      }
    },
    validateIfUserLoggedIn: async (req, res, next) => {
        const {username} = req.session;
        if (username) return next();
        res.send({success: false, message: "error: please sign in"})
    }
}