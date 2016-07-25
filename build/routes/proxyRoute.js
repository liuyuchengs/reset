/// <reference path="./../../typings/index.d.ts" />
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
const proxyRequest = require("./../modules/proxyRequest");
/**
 * 普通代理转发
 * @module
 */
const router = express.Router();
const url = "https://www.uokang.com";
/**
 * 普通文本接口转发到java服务器
 * @param {any} any
 */
function proxy(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield proxyRequest.request(req, url);
        res.send(result);
    });
}
router.use();
module.exports = router;

//# sourceMappingURL=proxyRoute.js.map
