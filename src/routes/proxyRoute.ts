/// <reference path="./../../typings/index.d.ts" />

import express = require("express");
import proxyRequest = require("./../modules/proxyRequest");

const router:express.Router = express.Router();
const url = "https://www.uokang.com";

router.use(async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    let result = await proxyRequest(req,url);
    res.send(result);
})
export = router;