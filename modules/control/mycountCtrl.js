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
function getToken(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.accessToken) {
            try {
                let queryResult = yield next();
                let result = queryResult[0];
                result["accessToken"] = ctx.request.body.accessToken;
                ctx.response.body = HttpResult.CreateSuccessResult(result);
            }
            catch (err) {
                console.log(err);
                ctx.throw(500);
            }
        }
        else {
            ctx.throw(400);
        }
    });
}
exports.getToken = getToken;
function getTokenQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let accessToken = ctx.request.body.accessToken;
        let result;
        let sqlResult;
        let sql = `select id,nickname,phone,face,sex,realname,email,gift_code,alipay,wxpay,referralCode from user where id in (select user_id from user_token where access_token = '${accessToken}')`;
        return yield MysqlConnect.query(sql);
    });
}
exports.getTokenQuery = getTokenQuery;
//# sourceMappingURL=mycountCtrl.js.map