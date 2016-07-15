/// <reference path="./../../typings/index.d.ts"/>
import express = require('express');
import HttpResult = require("./../modules/HttpResult");
import loginCtrl = require("./../controller/loginCtrl");

let router = express.Router();

router.post("",async (req:any,res:any)=>{
    if (req.body.phone && req.body.password) {
        let result:HttpResult;
        if(loginCtrl.check(req.body)){
            result =  await loginCtrl.login(req.body);
        }else{
            result = HttpResult.CreateFailResult("请输入正确的账号或者密码!");
        }
        res.send(result);
    }
    else {
        res.status(400).send("bad params");
    }
})

export = router;