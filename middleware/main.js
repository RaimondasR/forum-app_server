const forumAppUserModel = require("../models/userSchema");

module.exports = {
    validateUserRegister: async (req, res, next) => {
        const {userName, password1, password2} = req.body;

        const findUser = await forumAppUserModel.findOne({userName});
        if (findUser) {
            return res.send({success: false, message: "error: username is already taken"})
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
    }
    // validateAuction: (req, res, next) => {
    //     const {title, condition, startingBid} = req.body;

    //     if (title.length > 20 || title.length < 3) {
    //         return res.send({error: true, message: "error: bad title length"});
    //     }
    //     if (condition === "Pre-Owned") {
    //         // return res.send({error: false, message: "success: good condition entered"});    
    //     } else if (condition === "Brand New") {
    //         // return res.send({error: false, message: "success: good condition entered"});             
    //     } else {
    //         return res.send({error: true, message: "error: bad condition entered"});
    //     }
    //     if (startingBid <= 0 || startingBid > 1000) {
    //         return res.send({error: true, message: "error: bad starting bid entered"});
    //     }
        
    //     next();
    // }
}