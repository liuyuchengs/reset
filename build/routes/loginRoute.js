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
let router = express.Router();
router.post("", (req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
module.exports = router;
//# sourceMappingURL=loginRoute.js.map