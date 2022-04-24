const uuid = require("uuid");
const userDb = require("../models/userSchema");
const crypt = require("bcrypt");

let users = []
let auctions = [];
let bids = [];

module.exports = {
    userRegister: async (req, res) => {
        const {userName, password1} = req.body;

        const userExists = await userDb.findOne({userName});

        if (userExists) return res.send({error: true, message: "error: username is already taken"});

        const pswHash = await crypt.hash(password1, 10);
        const user = new userDb();
        user.userId = uuid.v4()
        user.userName = userName
        user.password = pswHash
        await user.save();
        // const user = {
        //     username,
        //     password: password1,
        //     secret: uuid.v4(),
        //     money: 1000,
        // }
        // users.push(user); 
        res.send({error: false, message: "success: new user registered"});
    },
    login: async (req, res) => {
        const {username, password} = req.body;

        const userExists = await userDb.findOne({username});
        if (!userExists) return res.send({error: true, message: "bad credentials"});

        const passMatch = await crypt.compare(password, userExists.password);

        if(passMatch) {
          return res.send({error: false, message: "success: user logged-in", user: userExists}); 
        }

        res.send({error: true, message: "bad credentials"});

        // const findUser = users.find(x => x.username === username && x.password === password)
        // if(findUser) {
        //     return res.send({error: false, message: "all good", secret: findUser.secret});
        // }
        // return res.send({error: true, message: "no user found"});
    },
    createAuction: async (req, res) => {
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
