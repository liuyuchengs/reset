import express = require('express');
import HttpResult = require("./../modules/HttpResult");
import orderCtrl = require("./../controller/orderCtrl");

/**
 * 订单相关接口
 * @module
 */
let router = express.Router();

/**
 * 查询项目的价钱信息
 * @param {number} productId - 项目的id
 * @returns {Object|Error} 返回查询的结果
 * @example
 * // 请求参数
 * productId=10017
 * // 响应结果
 * {
 *      "realMoney": 42750,
 *      "dealMoney": 4275,
 *      "payMoney": 38475,
 *      "giftMoney": 0
 *  }
 */
async function checkCodeMoney(req:express.Request,res:express.Response){
    if(req.body.productId){
        try{
            let result = await orderCtrl.checkCodeMoney(req.body.productId);
            res.send(result);
        }catch(err){
            console.log(err);
            res.status(500).end();
        }
    }else{
        res.status(400).end();
    }
}
router.use("/checkCodeMoney",checkCodeMoney)

export = router;