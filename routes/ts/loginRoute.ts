/// <reference path="./../../typings/index.d.ts"/>
const express = require('express');
const loginCtrl = require("./../../controller/js/loginCtrl");
let router = express.Router();

router.post("",(req,res)=>{
    if (req.body.phone && req.body.password) {
        if(loginCtrl.check(req.body)){
            loginCtrl.login(req.body,(err,rows:any,fields:any)=>{
                if(err!==null){
                    res.send("no");
                }else{
                    let row =rows;
                    let field = fields;
                    res.send("success");
                }
            });
        }else{
            res.status(400).send("bad params");
        }
    }
    else {
        res.status(400).send("bad params");
    }
})

export = router;