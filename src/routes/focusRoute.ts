/// <reference path="./../../typings/index.d.ts"/>
import express =  require("express");
import HttpResult = require("./../modules/HttpResult");
import FocusCtrl = require("./../controller/FocusCtrl");

let router = express.Router();

router.post("/focusManCount",async (req:any,res:any)=>{
    if(req.body.accessToken&&req.body.accessToken.length>0){
        try{
            let result:HttpResult = await FocusCtrl.getUserFocusCount(req.body);
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