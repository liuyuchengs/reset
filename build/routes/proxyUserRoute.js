"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require("fs");
const express = require("express");
const proxyRequest = require("./../modules/ProxyRequest");
const multer = require("multer");
const Tool = require("./../modules/Tool");
const router = express.Router();
const url = "https://www.uokang.com";
let upload = multer({ dest: "temp/upload" });
/**
 * 修改用户信息
 */
router.use(upload.single("headImage"), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.file) {
        let newPath;
        let result;
        // 添加图片后缀
        try {
            newPath = req.file.path + "." + req.file.originalname.split(".")[1];
            yield Tool.renameFile(req.file.path, newPath);
        }
        catch (err) {
            console.log(err);
            res.status(500);
        }
        // 发起http请求
        try {
            let formData = {};
            formData.headImage = fs.createReadStream(newPath);
            formData.name = "img";
            formData.val = "img";
            req.body.isMulter = true;
            req.body.formData = formData;
            result = yield proxyRequest.request(req, url);
            res.send(result);
        }
        catch (err) {
            console.log(err);
            res.status(500);
        }
    }
    else {
        res.status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=proxyUserRoute.js.map