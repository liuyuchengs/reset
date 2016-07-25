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
const HttpResult = require("./../modules/HttpResult");
const BannerCtrl = require("./../controller/BannerCtrl");
/**
 * banner图相关接口
 * @module
 */
let router = express.Router();
/**
 * /wx/banner/query - 查询banner图,
 * @param {string} type - 主页banner图传入home_banner
 * @returns {HttpResult|error} 返回查询结果
 * @example
 * //请求参数
 * type=home_banner
 * {
 *   "data":[
 *     {"path":"http://192.168.0.104:3000/download/ban1.png"},
 *     {"path":"http://192.168.0.104:3000/download/ban2.png"},
 *     {"path":"http://192.168.0.104:3000/download/ban3.png"}],
 *   "code":0,
 *   "message":"success"
 * }
 */
function query(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.type !== null || req.body.type !== undefined) {
            let result;
            if (req.body.type === "home_banner") {
                try {
                    result = yield BannerCtrl.queryBanner(req.body.type, req.headers["origin"]);
                    res.send(result);
                }
                catch (err) {
                    console.log(err);
                    res.status(500).end();
                }
            }
            else {
                res.send(HttpResult.CreateFailResult("参数错误"));
            }
        }
        else {
            res.status(400).end();
        }
    });
}
router.post("/query", query);
module.exports = router;
//# sourceMappingURL=bannerRoute.js.map