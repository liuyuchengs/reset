/// <reference path="./../../typings/index.d.ts"/>
import express = require('express');
import HttpResult = require("./../modules/HttpResult");
import MycountCtrl = require("./../controller/MycountCtrl");

let router = express.Router();

router.post("/getUserByToken", async (req,res)=>{
    if(req.body.accessToken){
        try{
            let result:HttpResult = await MycountCtrl.getUserByToken(req.body);
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