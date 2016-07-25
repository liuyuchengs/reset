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
/**
 * 用户信息修改转发
 * @module
 */
const router = express.Router();
const url = "https://www.uokang.com";
let upload = multer({ dest: "temp/upload" });
/**
 * 修改用户信息
 * @param {blob} headImage - 头像
 * @param {string} name - 修改的字段,修改头像时可不填
 * @param {string} val - 修改的字段的值
 */
function proxyUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
router.use(upload.single("headImage"), proxyUser);
module.exports = router;

//# sourceMappingURL=proxyUserRoute.js.map
