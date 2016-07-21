/// <reference path="./../../typings/index.d.ts" />
import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import ProductCtrl = require("./../controller/ProductCtrl");
import Tool = require("./../modules/Tool");
import NodeData = require("NodeData");

let router = express.Router();

/**
 * 查询热门专区
 * @params currentPage->分页页码
 */
router.post("/queryrecommend",async (req:express.Request,res:express.Response)=>{
    if(req.body.currentPage){
        let result:HttpResult;
        let productCtrl:ProductCtrl = new ProductCtrl();
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
})

/**
 * 查询项目列表
 * @params:
 * 必要参数:currentPage->分页页码,professionId->项目分类,牙科，美容等
 * 非必要参数:city,area,itemId,order等
 */
router.post("/querylist",async (req:express.Request,res:express.Response)=>{
    if(req.body.currentPage&&req.body.professionId){
        let productCtrl:ProductCtrl = new ProductCtrl();
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
})

/**
 * 查询项目详情
 * @params accessToken->用户token,productId->项目id
 */
router.post("/querybyid",async (req:express.Request,res:express.Response)=>{
    if(req.body.accessToken&&req.body.productId){
        let productCtrl:ProductCtrl = new ProductCtrl();
        try{
            let result:HttpResult = await productCtrl.querybyid(req.body);
            res.send(result);
        }catch(err){
            console.log(err);
            res.send(500).end();
        }
    }else{
        res.status(400);
    }
})

/**
 * 
 */

export = router;