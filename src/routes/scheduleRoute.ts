import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import Tool = require("./../modules/Tool");
import scheduleCtrl = require("./../controller/scheduleCtrl");

/**
 * @module
 * 排班相关接口
 */
let router = express.Router();

async function querybydoctorid(req:express.Request,res:express.Response){
    if(req.body.doctorId){
        try{
            let result:any = await scheduleCtrl.querybydoctorid(req.body.doctorId);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.use("/querybydoctorid",querybydoctorid);

export = router;