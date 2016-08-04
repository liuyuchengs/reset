/// <reference path="./../../typings/index.d.ts" />

import express = require("express");
import proxyRequest = require("./../modules/proxyRequest");

/**
 * 普通代理转发
 * @module
 */
const router:express.Router = express.Router();
//const url = "https://www.uokang.com";
const url = "https://192.168.0.222:8555/www";

/**
 * 普通文本接口转发到java服务器
 * @param {any} any
 */
async function proxy(req:express.Request,res:express.Response,next:express.NextFunction){
    let result = await proxyRequest.request(req,url);
    res.send(result);
}
router.use(proxy)

export = router;