"use strict";
/// <reference path="./../../typings/index.d.ts" />
const fs = require("fs");
const crypto = require("crypto");
/**
 * 各种辅助用的小工具
 * @module
 */
let cipher = crypto.createCipher("aes192", "uk123456");
let decipher = crypto.createDecipher("aes192", "uk123456");
/**
 * 过滤查询数据库得到的数据
 * @param {string} dest:需要得到的字段
 * @param {any} source:需要过滤的源数据
 * @returns {any} 过滤后的结果
 */
function FilterResult(dest, source) {
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
exports.FilterResult = FilterResult;
/**
 * 将source上的属性值转换到dest的同名属性上
 * @param {any} source - 数据源(req.body)
 * @param {any} dest - 接受数据的对象
 */
function initObject(source, dest) {
    for (let prop in dest) {
        if (source[prop]) {
            dest[prop] = source[prop];
        }
        else {
            dest[prop] = null;
        }
    }
}
exports.initObject = initObject;
/**
 * 对数据进行加密
 * @param {string} value - 需要加密的字符串
 * @return {string} 加密后的字符串
 */
function enCrypt(value) {
    cipher.update(value, "utf8");
    return cipher.final("hex");
}
exports.enCrypt = enCrypt;
/**
 * 对数据进行解密
 * @param {string} value - 需要解密的字符串
 * @return {string} 解密后的字符串
 */
function deCrypt(value) {
    decipher.update(value, "hex");
    return decipher.final("utf8");
}
exports.deCrypt = deCrypt;
/**
 * 为图片添加host
 * @param {string} host - url的host部分
 * @param {string} path - url的path部分
 */
function addHost(host, path) {
    return host + path;
}
exports.addHost = addHost;
/**
 * async/await读取文件
 * @param {string} path - 文件的path
 * @returns {Buffer} Buffer格式的文件数据
 */
function readFile(path) {
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
exports.readFile = readFile;
/**
 * async/await修改文件名
 * @param {string} oldPath - 源文件的path
 * @param {string} newPath - 新文件的path
 * @returns {Buffer} Buffer格式的文件数据
 */
function renameFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err !== null) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.renameFile = renameFile;
//# sourceMappingURL=Tool.js.map