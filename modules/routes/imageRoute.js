"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="./../../typings/index.d.ts" />
const express = require("express");
const imageCtrl = require("./../controller/imageCtrl");
/**
 * 图片相关接口
 * @module
 */
let router = express.Router();
/**
 * /wx/image/querybymainid - 查询医院或者项目的图片
 * @param {string} type - "HOSPITAL":医院,"PRODUCT":项目
 * @returns {HttpResult|Error} 返回查询结果，异常时返回500错误
 * @example
 * // 请求参数
 * type=PRODUCT&mainId=10017
 * // 响应结果
 * [{"url":"upload/image/hospital/dental/10017/d4fc0009ec37494ea3c82292080b8d89.png"}]
 */
function querybymainid(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.type && req.body.mainId) {
            try {
                let result = yield imageCtrl.queryImage(req.body);
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
router.post("/querybymainid", querybymainid);
module.exports = router;
//# sourceMappingURL=imageRoute.js.map