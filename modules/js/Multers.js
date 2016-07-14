"use strict";
/// <reference path="./../../typings/index.d.ts" />
const multer = require("multer");
/**
 * Multers
 */
class Multers {
    /**
     * 初始化对象
     * @params path->上传路径
     */
    constructor(path) {
        if (path) {
            this.path = path;
        }
        else {
            this.path = "upload/";
        }
    }
    /**
     * 设置上传路径
     */
    setPath(path) {
        if (path !== null) {
            this.path = path;
        }
    }
    /**
     * 创建multer上传对象
     */
    getUpLoad() {
        let storage = {
            destination: (req, file, cb) => {
                cb(null, this.path);
            },
            filename: (req, file, cb) => {
                let list = file.originalname.split(".");
                cb(null, Date.now() + "." + list[1]);
            }
        };
        return multer({ storage: storage });
    }
}
module.exports = Multers;
