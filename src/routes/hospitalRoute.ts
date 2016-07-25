import express = require("express");
import HospitalCtrl = require("./../controller/HospitalCtrl");

/**
 * 医院相关接口
 * @module
 */
let router = express.Router();

/**
 * /wx/hospital/querybyid - 根据医院id查询医院信息
 * @param {number} id - 医院id
 * @returns {object|Error} 返回查询结果
 * @example 
 * // 请求参数
 * id = 10002
 * // 响应结果
 * {
 *  "name": "友睦齿科福田时..." //医院名称
 *  "address": "深圳市福田区..." //医院地址
 *  "description": "友睦齿科..." //医院详情
 *  "logo": "upload/image/h..."  //医院logo图片
 * }
 */
async function queryByid(req:express.Request,res:express.Response){
    if(req.body.id&&parseInt(req.body.id)){
        req.body.id = parseInt(req.body.id);
        try{
            let result = await HospitalCtrl.queryById(req.body.id);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.post("/querybyid",queryByid);

export  = router;