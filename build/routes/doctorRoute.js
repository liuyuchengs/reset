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
const doctorCtrl = require("./../controller/doctorCtrl");
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
function queryschedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.productId) {
            try {
                let result = yield doctorCtrl.querySchedule(req.body.productId);
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
router.use("/queryscheduledoctorbyproductid", queryschedule);
module.exports = router;
//# sourceMappingURL=doctorRoute.js.map