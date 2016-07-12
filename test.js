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

//解析cookies
var parseCookie = (cookie)=>{
    var cookies = {};
    if(!cookie){
        return cookies;
    }
    var list = cookie.split(";");
    for(var i=0;i<list.length;i++){
        var repair = list[i].split("=");
        cookies[repair[0].trim()] = repair[1];
    }
    return cookies;
}

//生成cookies
var serizleCookie =  (key,value,opt)=>{
    var repairs = [key+"="+value];
    opt = opt || {};
    if(opt.maxAge){repairs.push("Max-Age="+opt.maxAge)};
    if(opt.path){repairs.push("Path="+opt.path)};
    if(opt.httpOnly){repairs.push("HttpOnly="+opt.httpOnly)};
    return repairs.join(";");
}



http.createServer((req,res)=>{
    if(req.headers['Content-Type']==="application/x-www-form-urlencoded"){
        var obj = queryString.parse(req.rawBody);
    }
    res.write("success");
    res.end();
}).listen(3000);
