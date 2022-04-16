// const valid = require("email-validator")

module.exports = {
    // validateEmail: (req, res, next) => {
    //     const {email} = req.params

    //     if (valid.validate(email)) {
    //         next()
    //     } else {
    //         res.send({error: "email is not valid"})
    //     }
    // },
    validateUser: (req, res, next) => {
        const {username, password1, password2} = req.body;

        if(username.length > 20 || username.length < 3) {
            return res.send({error: true, message: "error: bad username"});
        }

        if(password1 !== password2 || password1.length > 20 || password1.length < 3) {
            return res.send({error: true, message: "error: bad password"});
        }

        next();
    },
    validateAuction: (req, res, next) => {
        const {title, condition, startingBid} = req.body;

        if (title.length > 20 || title.length < 3) {
            return res.send({error: true, message: "error: bad title length"});
        }
        if (condition === "Pre-Owned") {
            // return res.send({error: false, message: "success: good condition entered"});    
        } else if (condition === "Brand New") {
            // return res.send({error: false, message: "success: good condition entered"});             
        } else {
            return res.send({error: true, message: "error: bad condition entered"});
        }
        if (startingBid <= 0 || startingBid > 1000) {
            return res.send({error: true, message: "error: bad starting bid entered"});
        }
        
        next();
    }
}