const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const forumUserDb = require("../models/userSchema");
const forumTopicDb = require("../models/topicSchema");
const forumCommentDb = require("../models/commentSchema");
const forumNotificationDb = require("../models/notificationSchema");

module.exports = {
    userRegister: async (req, res) => {
        const {userName, password1, userImage} = req.body;
        const userExists = await forumUserDb.findOne({userName});

        if (userExists) return res.send({error: true, message: "error: username is already taken"});

        const hashPassword = await bcrypt.hash(password1, saltRounds);
        const user = new forumUserDb();
        
        user.userId = uuidv4();
        user.userName = userName
        user.password = hashPassword
        user.registrationDate = Date.now();
        if (userImage.lenght > 0) {
          user.userImage = userImage
        }
        await user.save();
        res.send({error: false, message: "success: new user registered"});
    },
    userLogin: async (req, res) => {
        const {userName, password} = req.body;
        const userExists = await forumUserDb.findOne({userName});

        if (!userExists) return res.send({error: true, message: "error: bad username or password"});
        if (userExists) {
          const passwordsMatch = await bcrypt.compare(password, userExists.password);
          if(passwordsMatch) {
            req.session.userName = userName;
            const user = await forumUserDb.findOne({userName}, {userName: true});
            return res.send({error: false, message: "success: user logged-in", user}); 
          }  
        }
    },
    createTopic: async (req, res) => {
      const {topicTitle, topicAuthor, topicSummaryText, topicImage} = req.body;
      const {username} = req.session;
      const topic = new forumTopicDb();
      let id = uuidv4();
      topic.topicId = id;
      topic.topicTitle = topicTitle;
      topic.topicAuthor = topicAuthor;
      topic.topicSummaryText = topicSummaryText,
      topic.topicImage = topicImage;
      topic.topicCreationDate = Date.now();
      topic.newestCommentAuthor = username;
      topic.newestCommentDate = Date.now();
      topic.save();
      const user = await forumUserDb.findOne({username});
      await forumUserDb.findOneAndUpdate({username}, {$set: {topicsCount: user.topicsCount + 1}});
      res.send({error: false, message: "success: new topic was created", id});
    },
    getNotifications: async (req, res) => {
      const {userName} = req.session;
      const notifications = await forumNotificationDb.find({topicAuthor: userName}).sort({commentDate: -1});  // notifications []
      const commentsNotSeenCount = await forumNotificationDb.find({topicAuthor: userName, commentIsSeen: false}).count();
      res.send({success: true, notifications, commentsNotSeenCount});
    },
    getSingleTopic: async (req, res) => {
      const {id} = req.params;
      const topic = await forumTopicDb.findOne({topicId: id});
      res.send({success: true, topic});
    },
    getSingleTopicComments: async (req, res) => {
      const {id} = req.params;
      const {page} = req.params;

      if (page === String(1)) {
          const comments = await forumCommentDb.find({commentedTopicId: id}).limit(10);
          const count = await forumCommentDb.find({commentedTopicId: id}).count();
          res.send({success: true, comments, count});
      }
      if (page !== String(1)) {
          const comments = await forumCommentDb.find({commentedTopicId: id}).skip(Number(page) * 10 - 10).limit(10);
          const count = await forumCommentDb.find({commentedTopicId: id}).count();
          res.send({success: true, comments, count});
      }          
  },
  }
