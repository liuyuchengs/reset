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
router.use(upload.single("headImage"),async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    if(req.file){
        let newPath:string;
        let result:any;
        // 添加图片后缀
        try{
            newPath =  req.file.path+"."+req.file.originalname.split(".")[1]
            await Tool.renameFile(req.file.path,newPath);
        }catch(err){
            console.log(err);
            res.status(500);
        }
        // 发起http请求
        try{
            let formData:any = {};
            formData.headImage = fs.createReadStream(newPath);
            formData.name = "img";
            formData.val = "img";
            req.body.isMulter = true;
            req.body.formData = formData;
            result = await proxyRequest.request(req,url);
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