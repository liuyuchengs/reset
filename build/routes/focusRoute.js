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
const express = require("express");
const focusCtrl = require("./../controller/focusCtrl");
let router = express.Router();
router.post("/focusManCount", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.accessToken && req.body.accessToken.length > 0) {
        let result = yield focusCtrl.getUserFocusCount(req.body);
        res.send(result);
    }
    else {
        res.status(400).end();
    }
}));
module.exports = router;
//# sourceMappingURL=focusRoute.js.map