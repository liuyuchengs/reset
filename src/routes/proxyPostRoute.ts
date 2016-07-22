import fs = require("fs");
import express = require("express");
import proxyRequest = require("./../modules/ProxyRequest");
import multer = require("multer");
import Tool = require("./../modules/Tool");

const router:express.Router = express.Router();
let upload = multer({dest:"temp/upload"});
const url = "https://www.uokang.com";

let params = [{name:"img1"},{name:"img2"},{name:"img3"},{name:"p1"},{name:"p2"},{name:"p3"}];
router.use(upload.fields(params),async (req:express.Request,res:express.Response)=>{
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
})

export = router;