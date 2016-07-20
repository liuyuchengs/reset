import express = require('express');
import HttpResult = require("./../modules/HttpResult");
import BannerCtrl = require("./../controller/BannerCtrl");

let router = express.Router();
router.post("/query",async (req:express.Request,res:express.Response)=>{
    if(req.body.type!==null||req.body.type!==undefined){
        let result:HttpResult;
        if(req.body.type==="home_banner"){
            try{
                result = await BannerCtrl.queryBanner(req.body.type,req.headers["origin"]);
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
})

export = router;