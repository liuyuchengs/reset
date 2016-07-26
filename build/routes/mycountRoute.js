"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="./../../typings/index.d.ts"/>
const express = require('express');
const mycountCtrl = require("./../controller/mycountCtrl");
/**
 * 账号相关接口
 * @module
 */
let router = express.Router();
/**
 * /wx/mycount/getUserByToken - 根据accessToken查询用户信息
 * @param {string} accessToken - 用户accessToken
 * @returns {HttpResult|Error} 查询结果,异常时返回500
 * @example
 * // 请求参数
 * accessToken=c0925312c3d549d3a51d83ab1c58f157
 * // 响应结果
 * {"data":{"countFansMan":0,"countFocusMan":1},"code":0,"message":"查询成功!"}
 */
function getUserByToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.accessToken) {
            try {
                let result = yield mycountCtrl.getUserByToken(req.body);
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
router.post("/getUserByToken", getUserByToken);
module.exports = router;
//# sourceMappingURL=mycountRoute.js.map