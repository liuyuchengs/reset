/// <reference path="./../../typings/index.d.ts"/>
import express = require('express');
import HttpResult = require("./../modules/HttpResult");
import mycountCtrl = require("./../controller/mycountCtrl");

let router = express.Router();

router.post("/getUserByToken", async (req,res)=>{
    if(req.body.accessToken){
        let result:HttpResult = await mycountCtrl.getUserByToken(req.body);
        res.send(result);
    }else{
        res.status(400).end();
    }
})

export = router;