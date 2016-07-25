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
function queryByid(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.id && parseInt(req.body.id)) {
            req.body.id = parseInt(req.body.id);
            try {
                let result = yield HospitalCtrl.queryById(req.body.id);
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
router.post("/querybyid", queryByid);
module.exports = router;
//# sourceMappingURL=hospitalRoute.js.map