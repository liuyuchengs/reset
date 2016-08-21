"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const HttpResult = require("./../base/HttpResult");
const MysqlConnect = require("./../base/MysqlConnect");
const Tool = require("./../base/Tool");
function check(params) {
    if (params.phone && params.password) {
        if (/^1[3|4|5|7|8]\d{9}$/.test(params.phone) && params.password.length >= 8 && params.password.length <= 20) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
function wxlogin(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.phone && ctx.request.body.password) {
            let result;
            if (check(ctx.request.body)) {
                try {
                    result = yield next();
                }
                catch (err) {
                    console.log(err);
                    ctx.throw(500);
                }
            }
            else {
                result = HttpResult.CreateFailResult("请输入正确的账号或者密码!");
            }
            ctx.response.body = result;
        }
        else {
            ctx.throw(400);
        }
    });
}
exports.wxlogin = wxlogin;
function wxloginQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let params = ctx.request.body;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let result;
            let sqlResult;
            let sql = `select * from (select * from user where phone = '${params.phone}') as users left join user_token as token on users.id = token.user_id`;
            try {
                sqlResult = yield MysqlConnect.query(sql);
                if (sqlResult.length > 0 && sqlResult[0].password === params.password) {
                    let resResult = Tool.FilterResult(["id", "nickname", "phone", "face", "sex", "realname", "email", "gift_code", "alipay", "wxpay", "referralCode", "access_token"], sqlResult[0]);
                    resResult["accessToken"] = resResult["access_token"];
                    delete resResult["access_token"];
                    result = HttpResult.CreateResult(resResult, 0, "登录成功!");
                }
                else {
                    result = HttpResult.CreateFailResult("账号或者密码不正确!");
                }
                resolve(result);
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.wxloginQuery = wxloginQuery;
//# sourceMappingURL=loginCtrl.js.map