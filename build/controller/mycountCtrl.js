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
const Connect = require("./../modules/Connect");
const Tool = require("./../modules/Tool");
let connect = new Connect();
/**
 * mycountCtrl
 */
class mycountCtrl {
    constructor() {
    }
    static getUserByToken(params) {
        return __awaiter(this, void 0, Promise, function* () {
            let result;
            let sql = "select * from user where id in (select user_id from user_token where access_token = '" + params.accessToken + ")";
            let sqlResult = yield connect.connect(sql);
            return new Promise((resolve, reject) => {
                let filterResult = Tool.FilterResult(["id", "nickname", "phone", "face", "sex", "realname", "email", "gift_code", "alipay", "wxpay", "referralCode", "access_token"], sqlResult[0]);
                filterResult["accessToken"] = params.accessToken;
                result = HttpResult.CreateResult(filterResult, 0, "查询成功!");
                resolve(result);
            });
        });
    }
}
module.exports = mycountCtrl;
//# sourceMappingURL=mycountCtrl.js.map