/// <reference path="./../../typings/index.d.ts" />
import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import productCtrl = require("./../controller/productCtrl");
import Tool = require("./../modules/Tool");
import NodeData = require("NodeData");

/**
 * 项目相关接口
 * @module
 */
let router = express.Router();

/**
 * /wx/product/queryrecommend - 查询热门专区
 * @param {number} currentPage - 分页页码
 * @returns {HttpResult|Error} 查询结果,异常时返回500
 * @example
 * // 请求参数
 * city=深圳&currentPage=1
 * //响应结果
 * {
 *   "data":[
 *     {
 *       "id":10200,
 *       "title":"牙齿美白（冷光，进口材料）",
 *       "standPrice":2800,
 *       "preferPrice":2660,
 *       "pricetype":"元",
 *       "priceunit":"次",
 *       "sales":6,
 *       "samllimg":"upload/image/hospital/dental/10004/yachimeibailengguangjinkoucailiao/77b29ee477d54bb2bf767f69448cbbe2.jpg",
 *       "profession_id":24,
 *       "hospital_id":10004,
 *       "hospitalname":"友睦齿科福田金润店"
 *     }
 *   ],
 *   "code":0,
 *   "message":"success"
 * }
 */
async function queryrecommend(req:express.Request,res:express.Response){
    if(req.body.currentPage){
        let result:HttpResult;
        try{
            result = await productCtrl.queryRecommend(req.body.currentPage);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500);
        }
    }else{
        res.status(400).end();
    }
}
router.post("/queryrecommend",queryrecommend);

/**
 * /wx/product/querylist - 查询项目列表
 * @param {number} currentPage - 分页页码(必要)
 * @param {number} professionId - 项目分类,牙科，美容等(必要)
 * @param {string} city - 城市(非必要)
 * @param {string} area - 区域(非必要)
 * @param {number} itemId - 项目id(非必要)
 * @param {string} order - 排序(非必要)
 * @returns {HttpResult|Error} 查询结果,异常时返回500
 * @example
 * // 响应结果
 * [
 *   {
 *     "id":10017,
 *     "title":"隐适美隐形矫正",
 *     "standPrice":45000,
 *     "preferPrice":42750,
 *     "pricetype":"元起",
 *     "priceunit":"副",
 *     "sales":9,
 *     "samllimg":"upload/image/hospital/dental/10002/20151023/yinshimeiyinxingjiaozheng_105658165.jpg",
 *     "professionId":64,
 *     "hospitalId":10002,
 *     "hospitalname":"友睦齿科福田时代科技店",
 *     "hospital":{"name":"友睦齿科福田时代科技店"}
 *   }
 * ]
 */
async function queryList(req:express.Request,res:express.Response){
    if(req.body.currentPage&&req.body.professionId){
        try{
            let result:HttpResult = await productCtrl.queryList(req.body);
            res.send(result);
        }catch(err){
            console.log(err);
            res.send(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.post("/querylist",queryList);

/**
 * /wx/product/querybyid - 查询项目详情
 * @param {string} accessToken - 用户token
 * @param {string} productId - 项目id
 * @returns {HttpResult|Error} 查询结果,异常时返回500
 * @example
 * // 请求参数
 * id=10002
 * // 响应结果
 * {
 *   "name":"友睦齿科福田时代科技店",.
 *   "address":"深圳市福田区深南大道7028号时代科技大厦裙楼三楼",
 *   "description":"友睦齿科成立于...",
 *   "logo":"upload/image/hospital/logo/youmuchikefutianshidaikejidian/142808792.png"
 * }
 */
async function querybyid(req:express.Request,res:express.Response){
    if(req.body.productId){
        try{
            let result:HttpResult = await productCtrl.querybyid(req.body);
            res.send(result);
        }catch(err){
            console.log(err);
            res.send(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.post("/querybyid",querybyid);

export = router;