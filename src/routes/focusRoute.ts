/// <reference path="./../../typings/index.d.ts"/>
import express =  require("express");
import HttpResult = require("./../modules/HttpResult");
import focusCtrl = require("./../controller/focusCtrl");

/**
 * 关注相关接口
 * @module
 */
let router = express.Router();

/**
 * /wx/focus/focusManCount - 查询用户的粉丝关注数量
 * @param {string} accessToken - 用户的token
 * @returns {HttpResult|error} 返回查询结果，异常时返回500错误
 * @example
 * // 请求参数
 * accessToken:c0925312c3d549d3a51d83ab1c58f157
 * // 响应结果
 * {"data":{"countFansMan":0,"countFocusMan":1},"code":0,"message":"查询成功!"}
 */
async function focusManCount(req:any,res:any){
    if(req.body.accessToken&&req.body.accessToken.length>0){
        try{
            let result:HttpResult = await focusCtrl.getUserFocusCount(req.body.accessToken);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.post("/focusManCount",focusManCount);


export = router;