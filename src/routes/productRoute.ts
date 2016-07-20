/// <reference path="./../../typings/index.d.ts" />

import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import ProductCtrl = require("./../controller/ProductCtrl");
import NodeData = require("NodeData");

let router = express.Router();
router.post("/queryrecommend",async (req:express.Request,res:express.Response)=>{
    if(req.body.currentPage){
        let result:HttpResult;
        let queryParams:NodeData.IQueryParams;
        queryParams.currentPage = req.body.currentPage;
        
    }else{
        res.status(400).end();
    }
})

export = router;