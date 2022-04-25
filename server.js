const express = require('express');  // express for routing
const server = express();            // express server
const mongoose = require('mongoose');
const session = require("express-session")
require('dotenv').config();

server.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

server.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

server.use(express.json()); /// for getting data from req.body

// mongoose.connect(process.env.MONGO_KEY)
mongoose.connect("mongodb+srv://admin:7Tika$Bapr^Mi*mdb@cluster0.vev4u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(res => {
    console.log("connected to mongoDB")
  }).catch(e => {
    console.log(e)
  })

const router = require("./routes/main");
server.use("/", router);

const http = require("http").createServer(server);

http.listen(4000, () => {
    console.log("listenning to port 4000...")
})