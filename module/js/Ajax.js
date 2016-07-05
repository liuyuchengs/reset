var req = require("request"); //http访问

/**
 * 变量
 */
var params = {
    host:"https://www.uokang.com",
    //host:"https://192.168.0.222:8555/www",
}

/**
 * 发起http的get请求
 */
function get(reqObj){
    return new Promise(function(resolve,reject){
        var obj = {
            url:params.host+reqObj.path,
        }
        if(reqObj.header.accesstoken){
            obj.headers = {
                "accessToken":reqObj.header.accessToken
            };
        }
        req.get(obj,function(err,response,body){
            if(err){
                return reject(err);
            }else{
                return resolve(body);
            }
        })
    })
}

/**
 * 发起http的post请求
 */
function post(reqObj){
    return new Promise(function(resolve,reject){
        var obj= {
            url:params.host+reqObj.path,
            form:reqObj.body,
        }
        //koa-router会将accesToken转换为accesstoken，需手动转换
        if(reqObj.header.accesstoken){
            obj.headers = {
                "accessToken":reqObj.header.accesstoken
            }
        }
        req.post(obj,function(err,response,body){
            if(err){
                return reject(err);
            }else{
                return resolve(body);
            }
        })
    })
}

module.exports = {
    get:get,
    post:post
}