import express = require('express');
import HttpResult = require("./../modules/HttpResult");
import bannerCtrl = require("./../controller/bannerCtrl");

/**
 * banner图相关接口
 * @module
 */
let router = express.Router();

/**
 * /wx/banner/query - 查询banner图,
 * @param {string} type - 主页banner图传入home_banner
 * @returns {HttpResult|error} 返回查询结果
 * @example
 * //请求参数
 * type=home_banner
 * {
 *   "data":[
 *     {"path":"http://192.168.0.104:3000/download/ban1.png"},
 *     {"path":"http://192.168.0.104:3000/download/ban2.png"},
 *     {"path":"http://192.168.0.104:3000/download/ban3.png"}],
 *   "code":0,
 *   "message":"success"
 * }
 */
async function query(req:express.Request,res:express.Response){
    if(req.body.type!==null||req.body.type!==undefined){
        let result:HttpResult;
        if(req.body.type==="home_banner"){
            try{
                result = await bannerCtrl.queryBanner(req.body.type,req.headers["origin"]);
                res.send(result);
            }catch(err){
                console.log(err);
                res.status(500).end();
            }
        }else{
            res.send(HttpResult.CreateFailResult("参数错误"));
        }
    }else{
        res.status(400).end();
    }
}
router.post("/query",query);

export = router;