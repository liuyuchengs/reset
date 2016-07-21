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
const ImageCtrl = require("./../controller/ImageCtrl");
let router = express.Router();
router.post("/querybymainid", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.type && req.body.mainId) {
        try {
            let result = yield ImageCtrl.queryImage(req.body);
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
}));
module.exports = router;
//# sourceMappingURL=imageRoute.js.map