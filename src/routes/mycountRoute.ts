/// <reference path="./../../typings/index.d.ts"/>
import express = require('express');
import HttpResult = require("./../modules/HttpResult");
import MycountCtrl = require("./../controller/MycountCtrl");

/**
 * 账号相关接口
 * @module
 */
let router = express.Router();

/**
 * /wx/mycount/getUserByToken - 根据accessToken查询用户信息
 * @param {string} accessToken - 用户accessToken
 * @returns {HttpResult|Error} 查询结果,异常时返回500
 * @example
 * // 请求参数
 * accessToken=c0925312c3d549d3a51d83ab1c58f157
 * // 响应结果
 * {"data":{"countFansMan":0,"countFocusMan":1},"code":0,"message":"查询成功!"}
 */
async function getUserByToken(req:express.Request,res:express.Response){
    if(req.body.accessToken){
        try{
            let result:HttpResult = await MycountCtrl.getUserByToken(req.body);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.post("/getUserByToken", getUserByToken);


export = router;