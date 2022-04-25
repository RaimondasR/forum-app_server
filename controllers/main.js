const { v4: uuidv4 } = require('uuid');
const forumUserDb = require("../models/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
      const {productPicture, title, condition, startingBid, endTime, secret} = req.body;
      // const user = users.find(x => x.secret === secret);
      const user =  await userDb.findOne({secretKey:secret});

      // if such user exists in users[], we push newly created auction to the auctions []
      if (user) {
        auctions.push({
          ownerName: user.username,
          productPicture, 
          title,
          url: title.replace(/ /g, "-"), 
          condition, 
          startingBid, 
          endTime                                                                                                 
        })  
        console.log("auctions :", auctions);
        return res.send({error: false, message: "success: new auction created", auctions});
      } else {
          // if user is not found in users[] , then message appears
          res.send({error: true, message: "bad credentials"});
        }
    },
    getSingleAuction: (req, res) => {
      const {url} = req.params; 
      const auction = auctions.find(x => x.url === url)
      res.send({error: false, message: "success in getting single auction", auction}) 
    }
}
    //     const {title, description, photo, link, secret} = req.body
    //     const user = users.find(x => x.secret === secret)
    //     if(user) {
    //         posts.push({
    //             url: title.replace(/ /g, "-"),
    //             title,
    //             description,
    //             photo,
    //             link,
    //             username: user.username
    //         })
    //         return res.send({error: false, message: "all good", posts})
    //     }
    //     res.send({error: true, message: "bad credentials"})
    // },
    // getSinglePost: (req, res) => {
    //     const {url} = req.params
    //     const post = posts.find(x => x.url === url)
    //     res.send({error: false, message: "all good", post})
    // }


// when user is logged in, make login for post uploading
// post should have:
// title, description, photo, link
// when post uploaded it gets username, depending on which user uploaded the post
// post can't be uploaded if user is not logged in
// to determine if user is logged in, check if secret code which you get on login is valid (it finds user in users array)
