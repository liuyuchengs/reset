import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import Tool = require("./../modules/Tool");
import scheduleCtrl = require("./../controller/scheduleCtrl");

/**
 * 排班相关接口
 * @module
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

async function autoSchedule(req:express.Request,res:express.Response){
    let date:any = new Date();
    let times:string[] = ['9:00:00','10:00:00','11:00:00','13:00:00','14:00:00','15:00:00','16:00:00','17:00:00'];
    let days:string[] = [];
    for(let index = 0;index<7;index++){
        days.push(date.toISOString().slice(0,10));
        date.setDate(date.getDate()+1);
    }
    try{
        let result = await scheduleCtrl.autoSchedule(days,times);
        res.send(result);
    }catch(err){
        res.status(400).end();
    }   
}

router.use("/autoSchedule",autoSchedule);

export = router;