import fs = require("fs");
import express = require("express");
import proxyRequest = require("./../modules/ProxyRequest");
import multer = require("multer");
import Tool = require("./../modules/Tool");

/**
 * 用户信息修改转发
 * @module
 */
const router = express.Router();
const url = "https://www.uokang.com";
let upload = multer({dest:"temp/upload"});

/**
 * 修改用户信息
 * @param {blob} headImage - 头像
 * @param {string} name - 修改的字段,修改头像时可不填
 * @param {string} val - 修改的字段的值
 */
async function proxyUser(req:express.Request,res:express.Response,next:express.NextFunction){
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
}
router.use(upload.single("headImage"),proxyUser);


export = router;