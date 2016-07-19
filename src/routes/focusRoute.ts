/// <reference path="./../../typings/index.d.ts"/>
import express =  require("express");
import HttpResult = require("./../modules/HttpResult");
import focusCtrl = require("./../controller/focusCtrl");

let router = express.Router();

router.post("/focusManCount",async (req:any,res:any)=>{
    if(req.body.accessToken&&req.body.accessToken.length>0){
        let result = await focusCtrl.getUserFocusCount(req.body);
        res.send(result);
    }else{
        res.status(400).end();
    }
})

export = router;