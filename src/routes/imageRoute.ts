/// <reference path="./../../typings/index.d.ts" />
import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import ImageCtrl = require("./../controller/ImageCtrl");
import Tool = require("./../modules/Tool");
import NodeData = require("NodeData");

/**
 * 图片相关接口
 * @module
 */
let router = express.Router();

/**
 * /wx/image/querybymainid - 查询医院或者项目的图片
 * @param {string} type - "HOSPITAL":医院,"PRODUCT":项目
 * @returns {HttpResult|Error} 返回查询结果，异常时返回500错误
 * @example
 * // 请求参数
 * type=PRODUCT&mainId=10017
 * // 响应结果
 * [{"url":"upload/image/hospital/dental/10017/d4fc0009ec37494ea3c82292080b8d89.png"}]
 */
async function querybymainid(req:express.Request,res:express.Response){
    if(req.body.type&&req.body.mainId){
        try{
            let result:HttpResult = await ImageCtrl.queryImage(req.body);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.post("/querybymainid",querybymainid);


export = router;