/// <reference path="./typings/index.d.ts" />
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/mainRoute");
const app = express();

app.use(express.static("./public"));
app.use(bodyParser.urlencoded());
app.use(router);

//监听端口
app.listen(3000,function(){
    console.log("Node.js Server is run...");
});