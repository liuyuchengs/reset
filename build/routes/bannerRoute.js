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
let router = express.Router();
router.post("/query", (req, res) => __awaiter(this, void 0, void 0, function* () {
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
}));
module.exports = router;
//# sourceMappingURL=bannerRoute.js.map