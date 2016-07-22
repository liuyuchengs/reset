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
const HttpResult = require("./../modules/HttpResult");
const MysqlConnect = require("./../modules/MysqlConnect");
/**
 * 关注相关的模块
 * @module FocusCtrl
 */
/**
 * 根据accessToken获取用户的粉丝数量和关注数量
 * @param {any} params - 经过express parser转换的req.body，需有accessToken属性
 * @returns {HttpResult|any} 查询结果，异常时返回error异常对象
 */
function getUserFocusCount(params) {
    return __awaiter(this, void 0, Promise, function* () {
        let result;
        let fansSql = "select count(fansId) as fansCount from focus where focusId in (select user_id from user_token where access_token='" + params.accessToken + "')";
        let focusSql = "select count(focusId) as focusCount from focus where fansId in (select user_id from user_token where access_token='" + params.accessToken + "')";
        try {
            let fansResult = yield MysqlConnect.query(fansSql);
            let focusResult = yield MysqlConnect.query(focusSql);
            return new Promise((resolve, reject) => {
                result = HttpResult.CreateResult({ "countFansMan": fansResult[0].fansCount, "countFocusMan": focusResult[0].focusCount }, 0, "查询成功!");
                resolve(result);
            });
        }
        catch (err) {
            console.log(err);
            return new Promise((resolve, reject) => {
                reject(err);
            });
        }
    });
}
exports.getUserFocusCount = getUserFocusCount;
//# sourceMappingURL=FocusCtrl.js.map