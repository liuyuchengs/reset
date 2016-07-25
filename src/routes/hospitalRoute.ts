import express = require("express");
import HttpResult = require("./../modules/HttpResult");
import HospitalCtrl = require("./../controller/HospitalCtrl");

/**
 * @module
 * 医院相关接口
 */
let router = express.Router();

/**
 * /wx/hospital/querybyid - 查询医院信息
 * @param {number} id - 医院id
 * @returns {HttpResult|Error} 返回查询结果
 * @example
 * // 发起请求
 * id=10072
 * // 响应结果
 * {
 *    "name":"友睦齿科福田时代科技店",
 *    "address":"深圳市福田区深南大道7028号...",
 *    "description":"友睦齿科成立于2006年...,
 *    "logo":"upload/image/hospital/logo/youmuchikefutianshidaikejidian/142808792.png"
 * }
 */
async function querybyid(req:express.Request,res:express.Response){
    if(req.body.id){
        try{
            let result:HttpResult = await HospitalCtrl.queryById(req.body.id);
            res.send(result);
        }catch(error){
            console.log(error);
            res.status(500).end();
        }
    }else{ 
        res.status(400).end();
    }
}

router.post("/querybyid",querybyid);

export = router;
