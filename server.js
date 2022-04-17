const express = require('express');  // express for routing
const server = express();            // express server
const mongoose = require('mongoose');

server.use(express.json()); /// for getting data from req.body

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

server.listen(4000);   // listening to port 4000
console.log("listening to port 4000...");

mongoose.connect("mongodb+srv://admin:7Tika$Bapr^Mi*mdb@cluster0.vev4u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(res=>{
    console.log("connection good")
  }).catch(e =>{
    console.log(e)
  })

const router = require("./routes/main");
server.use("/", router);