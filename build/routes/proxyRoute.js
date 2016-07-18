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
const Multer = require("./../modules/Multers");
const multer = new Multer("public/upload");
const upload = multer.getUpLoad();
const router = express.Router();
const url = "https://www.uokang.com";
const addPostParams = [{ name: "img1" }, { name: "img2" }, { name: "img3" }, { name: "p1" }, { name: "p2" }, { name: "p3" }];
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    /*if(req.headers["content-type"]&&req.headers["content-type"].split(";").length>0){
        let contentType = req.headers["content-type"].split(";")[0];
        if(contentType==="application/x-www-form-urlencoded"){
            let result = await proxyRequest(req,url);
            res.send(result);
        }else if(contentType==="multipart/form-data"){
            next("route");
        }else{
            res.status(400).end();
        }
    }*/
    let result = yield proxyRequest(req, url);
    res.send(result);
}));
router.post("/wx/post/addPost", upload.fields(addPostParams), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let r = req;
    res.send("success");
}));
module.exports = router;
//# sourceMappingURL=proxyRoute.js.map