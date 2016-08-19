/// <reference path="./../../../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const proxyRequest = require("./proxyRequest");
/**
 * 普通代理转发
 * @module
 */
const url = "https://www.uokang.com";
//const url = "https://192.168.0.222:8555/www";
/**
 * 普通文本接口转发到java服务器
 * @param {any} any
 */
function request(ctx) {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            let result = yield proxyRequest.request(ctx.request, url);
            ctx.response.body = result;
        }
        catch (err) {
            console.log(err);
            ctx.throw(500);
        }
    });
}
module.exports = {
    request: request
};
//# sourceMappingURL=proxy.js.map