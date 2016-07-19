import fs = require("fs");
import express = require("express");
import proxyRequest = require("./../modules/ProxyRequest");
import multer = require("multer");
import Tool = require("./../modules/Tool");

const router = express.Router();
const url = "https://www.uokang.com";
let upload = multer({dest:"temp/upload"});

/**
 * 修改用户信息
 */
let params:any[] = [{name:"headImage"}];
router.use(upload.single("headImage"),async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    if(req.file){
        let headImage:Buffer;
        let result:any;
        try{
            let formData:any = new Object();
            formData.headImage = fs.createReadStream(req.file.path);
            formData.name = "img";
            formData.val = "img";
            req.body.isMulter = true;
            req.body.formData = formData;
        }catch(err){
            console.log(err);
            res.status(500);
        }
        try{
            result = await proxyRequest(req,url);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500);
        }     
    }else{
        res.status(400);
    }
})


export = router;