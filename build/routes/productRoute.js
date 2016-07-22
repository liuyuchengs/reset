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
const ProductCtrl = require("./../controller/ProductCtrl");
let router = express.Router();
/**
 * 查询热门专区
 * @param currentPage->分页页码
 */
router.post("/queryrecommend", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.currentPage) {
        let result;
        let productCtrl = new ProductCtrl();
        try {
            result = yield productCtrl.queryRecommend(req.body.currentPage);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.status(500);
        }
    }
    else {
        res.status(400).end();
    }
}));
/**
 * 查询项目列表
 * @param 必要参数:currentPage->分页页码,professionId->项目分类,牙科，美容等
 * @param 非必要参数:city,area,itemId,order等
 */
router.post("/querylist", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.currentPage && req.body.professionId) {
        let productCtrl = new ProductCtrl();
        try {
            let result = yield productCtrl.queryList(req.body);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.send(500).end();
        }
    }
    else {
        res.status(400).end();
    }
}));
/**
 * 查询项目详情
 * @param accessToken->用户token,productId->项目id
 */
router.post("/querybyid", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.accessToken && req.body.productId) {
        let productCtrl = new ProductCtrl();
        try {
            let result = yield productCtrl.querybyid(req.body);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.send(500).end();
        }
    }
    else {
        res.status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=productRoute.js.map