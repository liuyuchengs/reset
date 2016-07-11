/// <reference path="typings/index.d.ts" />

var http = require("http");
var https = require("https");
var url = require("url");
var queryString =require("querystring");

var postData = queryString.stringify({
    'type':'home_banner'
})

var options = {
    hostname:"www.uokang.com",
    path:"/wx/banner/query",
    method:"POST",
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
    }
}


http.createServer((req,res)=>{
    var clientRequest = http.request(options,(clientRes)=>{
        var chunks = [];
        console.log("status:"+clientRes.statusCode);
        clientRes.on('data',(chunk)=>{
            chunks.push(chunk);
        })
        clientRes.on('end',()=>{
            var result = null;
            for(var i=0;i<chunks.length;i++){
                result += chunks[i];
            }
            res.statusCode = clientRes.statusCode;
            res.statusMessage = clientRes.statusMessage;
            res.write(result);
            res.end();
        })
    })
    clientRequest.write(postData);
    clientRequest.end();
}).listen(3000);
