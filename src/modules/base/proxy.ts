/// <reference path="./../../../typings/index.d.ts" />

import Koa = require('koa');
import proxyRequest = require("./proxyRequest");

/**
 * 普通代理转发
 * @module
 */

const url = "https://www.uokang.com";
//const url = "https://192.168.0.222:8555/www";

/**
 * 普通文本接口转发到java服务器
 * @param {any} any
 */
async function request(ctx:Koa.Context):Promise<any>{
    try{
        let result = await proxyRequest.request(ctx.request,url);
        ctx.response.body = result;
    }catch(err){
        console.log(err);
        ctx.throw(500);
    }
}

export = {
    request:request
}