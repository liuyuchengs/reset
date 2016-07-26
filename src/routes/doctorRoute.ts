import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import doctorCtrl = require("./../controller/doctorCtrl");

/**
 * 医生相关接口
 * @module
 */
let router = express.Router();

/**
 * 查询项目的排班信息
 * @param {string} productId - 项目id
 * @returns {Object|Error} - 返回查询结果
 * @example
 * {
 *   "list":[
 *       {
 *           "id":10014,
 *           "doctorname":"陈钢",
 *           "hobby":"各种复杂种植、疑难种植、全口无牙颌种植、微创无痛种植。",
 *           "score":null,
 *           "hospitalid":10002,
 *           "face":"upload/image/doctor/20151015/10002/chengang/165027610.jpg"
 *       }
 *   ]
 * }
 */
async function queryschedule(req:express.Request,res:express.Response){
    if(req.body.productId){
        try{
            let result = await doctorCtrl.querySchedule(req.body.productId);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.use("/queryscheduledoctorbyproductid",queryschedule);


export = router;