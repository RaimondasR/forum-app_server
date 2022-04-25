const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const forumUserDb = require("../models/userSchema");
const topicUserDb = require("../models/topicSchema");

// let users = []
// let auctions = [];
// let bids = [];

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
        // users.push(user); 
        res.send({error: false, message: "success: new user registered"});
    },
    login: async (req, res) => {
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

        // const findUser = users.find(x => x.username === username && x.password === password)
        // if(findUser) {
        //     return res.send({error: false, message: "all good", secret: findUser.secret});
        // }
        // return res.send({error: true, message: "no user found"});
    },
    createTopic: async (req, res) => {
      const {topicTitle, topicCreatorName, topicMessage, topicImage} = req.body;
      const {username} = req.session;
      const topic = new forumUserDb();
      let id = uuidv4();
      topic.topicId = id;
      topic.topicTitle = topicTitle;
      topic.topicCreatorName = topicCreatorName;
      topic.topicMessage = topicMessage,
      topic.topicImage = topicImage;
      topic.topicCreationDate = Date.now();
      topic.newestMessageAuthor = username;
      topic.newestMessageDate = Date.now();
      topic.save();
      const user = await forumUserDb.findOne({username});
      await forumUserDb.findOneAndUpdate({username}, {$set: {topicsCount: user.topicsCount + 1}});
      res.send({error: false, message: "success: new topic was created", id});
    }
  }
