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
        const {userName} = req.session;
        if (userName) return next();
        res.send({success: false, message: "error: please sign in"})
    },
    validateTopic: async (req, res, next) => {
        const { topicTitle, topicSummaryText, topicImage } = req.body;
        const topicExists = await forumTopicDb.findOne({topicTitle});
        if (topicExists) {
            return res.send({success: false, message: "error: topic tile already exists"});
        }
        if (topicTitle.length < 8 || topicTitle.length > 60) {
            return res.send({success: false, message: "error: title length must be 8-60 characters"});
        }
        if (topicSummaryText.length < 2 || topicSummaryText.length > 400) {
            return res.send({success: false, message: "error: summary text length should be 2-400 characters"});
        }
        if (topicImage.length > 0) {
            if (topicImage.includes("jpeg") || topicImage.includes("jpg") || topicImage.includes("gif") || topicImage.includes("png")) {
            } else {
                res.send({success: false, message: "error: bad image file format"})
            }            
          }
        next();
    },
}