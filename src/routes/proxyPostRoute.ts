import fs = require("fs");
import express = require("express");
import proxyRequest = require("./../modules/ProxyRequest");
import multer = require("multer");
import Tool = require("./../modules/Tool");

/**
 * 帖子相关接口
 * @module
 */
const router:express.Router = express.Router();
let upload = multer({dest:"temp/upload"});
const url = "https://www.uokang.com";

let params = [{name:"img1"},{name:"img2"},{name:"img3"},{name:"p1"},{name:"p2"},{name:"p3"}];
/**
 * /wx/post/addPost - 发布帖子
 * @param {blob} img1 - 术前图片一
 * @param {blob} img2 - 术前图片二
 * @param {blob} img3 - 术前图片三
 * @param {blob} p1 - 术后图片一
 * @param {blob} p2 - 术后图片二
 * @param {blob} p3 - 术后图片三
 * @param {string} postName - 帖子标题
 * @param {string} postContent - 帖子内容
 * @param {string} postFlags - 帖子类型,1：看牙,2：求美，3：孕生
 * @param {number} doctorId - 医生id
 * @param {number} productId - 项目id
 * @param {number} hospitalId - 医院id
 * @returns {HttpResult|Error} 查询结果,异常时返回500   
 */ 
async function proxy(req:express.Request,res:express.Response){
    if(req.files){
        let oldPaths:string[] = [];
        let newPaths:string[] = [];
        let result:any;
        for(var pro in req.files){
            oldPaths.push(req.files[pro][0].path);
            newPaths.push(req.files[pro][0].path+"."+req.files[pro][0].mimetype.split("/")[1]);
        }
        try{
            for(var index in oldPaths){
                await Tool.renameFile(oldPaths[index],newPaths[index]);
            }
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
        try{
            let formData:any = {};
            formData.img1 = fs.createReadStream(newPaths[0]);
            formData.img2 = fs.createReadStream(newPaths[1]);
            formData.img3 = fs.createReadStream(newPaths[2]);
            formData.p1 = fs.createReadStream(newPaths[3]);
            formData.p2 = fs.createReadStream(newPaths[4]);
            formData.p3 = fs.createReadStream(newPaths[5]);
            formData.postName = req.body.postName;
            formData.postContent = req.body.postContent;
            formData.postFlags = req.body.postFlags;
            if(req.body.doctorId){
                formData.doctorId = req.body.doctorId;
            }
            if(req.body.flag){
                formData.flag = req.body.flag;
            }
            if(req.body.productId){
                formData.productId = req.body.productId;
            }
            if(req.body.hospitalId){
                formData.hospitalId = req.body.hospitalId;
            }
            req.body.formData = formData;
            req.body.isMulter = true;
            result = await proxyRequest.request(req,url);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.use(upload.fields(params),proxy);

export = router;