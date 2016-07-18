/// <reference path="./../../typings/index.d.ts" />

import express = require("express");
import proxyRequest = require("./../modules/proxyRequest");
import Multer = require("./../modules/Multers");
const multer = new Multer("public/upload");
const upload = multer.getUpLoad();

const router:express.Router = express.Router();
const url = "https://www.uokang.com";
const addPostParams = [{name:"img1"},{name:"img2"},{name:"img3"},{name:"p1"},{name:"p2"},{name:"p3"}];

router.use(async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    /*if(req.headers["content-type"]&&req.headers["content-type"].split(";").length>0){
        let contentType = req.headers["content-type"].split(";")[0];
        if(contentType==="application/x-www-form-urlencoded"){
            let result = await proxyRequest(req,url);
            res.send(result);
        }else if(contentType==="multipart/form-data"){
            next("route");
        }else{
            res.status(400).end();
        }
    }*/
    let result = await proxyRequest(req,url);
    res.send(result);
})


router.post("/wx/post/addPost",upload.fields(addPostParams),async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    let r = req;
    res.send("success");
})

export = router;