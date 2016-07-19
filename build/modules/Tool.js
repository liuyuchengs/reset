"use strict";
/// <reference path="./../../typings/index.d.ts" />
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
/**
 * Tool
 * 工具类
 */
class Tool {
    constructor() {
    }
    /**
     * 过滤查询数据库得到的数据
     * @params dest:需要得到的字段，source:需要过滤的源数据
     */
    static FilterResult(dest, source) {
        let result = {};
        for (let item of dest) {
            if (source[item]) {
                result[item] = source[item];
            }
            else {
                result[item] = null;
            }
        }
        return result;
    }
    /**
     * 对数据进行加密
     * @params value->需要加密的字符串
     * @return 加密后的字符串
     */
    static enCrypt(value) {
        Tool.cipher.update(value, "utf8");
        return Tool.cipher.final("hex");
    }
    /**
     * 对数据进行解密
     * @params value->需要解密的字符串
     * @return 解密后的字符串
     */
    static deCrypt(value) {
        Tool.decipher.update(value, "hex");
        return Tool.decipher.final("utf8");
    }
    /**
     * 创建multer上传对象
     * @params path->保存上传文件的路径,默认为public/upload
     */
    static getUpLoad(path) {
        path = path || "public/upload";
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path);
            },
            filename: function (req, file, cb) {
                let list = file.originalname.split(".");
                cb(null, Date.now() + "." + list[1]);
            }
        });
        return multer({ storage: storage });
    }
    /**
     * async/await读取文本
     */
    static readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
}
Tool.cipher = crypto.createCipher("aes192", "uk123456");
Tool.decipher = crypto.createDecipher("aes192", "uk123456");
module.exports = Tool;
//# sourceMappingURL=Tool.js.map