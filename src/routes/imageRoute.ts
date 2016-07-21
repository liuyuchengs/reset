/// <reference path="./../../typings/index.d.ts" />
import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import ImageCtrl = require("./../controller/ImageCtrl");
import Tool = require("./../modules/Tool");
import NodeData = require("NodeData");

let router = express.Router();
router.post("/querybymainid",async (req:express.Request,res:express.Response)=>{
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
})


export = router;