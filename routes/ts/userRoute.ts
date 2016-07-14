/// <reference path="./../../typings/index.d.ts"/>

import express = require('express');
import Connect = require("./../../modules/js/Connect");

let router = express.Router();

router.post("",(req:any ,res:any)=>{
    if(req.params.accessToken){
        let accessToken = req.params.accessToken;
        res.send(accessToken);
    }else{
        res.status(400).send("no accessToken");
    }
})
export = router;
