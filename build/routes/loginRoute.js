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
const HttpResult = require("./../modules/HttpResult");
const LoginCtrl = require("./../controller/LoginCtrl");
/**
 * 登录相关接口
 * @module
 */
let router = express.Router();
/**
 * /wx/login/wxlogin - 用户登录
 * @param {string} phone - 手机号码
 * @param {string} password - 密码
 * @return {HttpResult|Error} 登录结果
 * @example
 * // 请求参数
 * phone=18124792560&password=uokang123
 * // 响应结果
 * {
 *   "data":
 *     {
 *       "id":11326,
 *       "nickname":"小绿皮",
 *       "phone":"18124792560",
 *       "face":"upload/image/post/20160701/3df467e43f2d4a11aeba237b715e5a54.jpeg",
 *       "sex":"男",
 *       "realname":"123",
 *       "email":null,
 *       "gift_code":1,
 *       "alipay":"liuyuchengs",
 *       "wxpay":"399865",
 *       "referralCode":17802,
 *       "accessToken":"c0925312c3d549d3a51d83ab1c58f157"
 *     },
 *   "code":0,
 *   "message":"登录成功!"}
 */
function wxlogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.phone && req.body.password) {
            let result;
            if (LoginCtrl.check(req.body)) {
                try {
                    result = yield LoginCtrl.login(req.body);
                }
                catch (err) {
                    console.log(err);
                    res.status(500).end();
                }
            }
            else {
                result = HttpResult.CreateFailResult("请输入正确的账号或者密码!");
            }
            res.send(result);
        }
        else {
            res.status(400).send("bad params");
        }
    });
}
router.post("/wxlogin", wxlogin);
module.exports = router;
//# sourceMappingURL=loginRoute.js.map