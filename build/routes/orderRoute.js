"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require('express');
const orderCtrl = require("./../controller/orderCtrl");
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
function checkCodeMoney(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.productId) {
            try {
                let result = yield orderCtrl.checkCodeMoney(req.body.productId);
                res.send(result);
            }
            catch (err) {
                console.log(err);
                res.status(500).end();
            }
        }
        else {
            res.status(400).end();
        }
    });
}
router.use("/checkCodeMoney", checkCodeMoney);
module.exports = router;
//# sourceMappingURL=orderRoute.js.map