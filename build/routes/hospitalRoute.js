"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const HospitalCtrl = require("./../controller/HospitalCtrl");
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
function querybyid(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.id) {
            try {
                let result = yield HospitalCtrl.queryById(req.body.id);
                res.send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).end();
            }
        }
        else {
            res.status(400).end();
        }
    });
}
router.post("/querybyid", querybyid);
module.exports = router;
//# sourceMappingURL=hospitalRoute.js.map