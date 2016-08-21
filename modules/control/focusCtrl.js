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
function focusManCount(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.accessToken && ctx.request.body.accessToken.length > 0) {
            try {
                let result = yield next();
                ctx.response.body = HttpResult.CreateSuccessResult(result[0]);
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
exports.focusManCount = focusManCount;
function focusManCountQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let accessToken = ctx.request.body.accessToken;
        let sql = `select count(fansId) as countFansMan,(select count(focusId) from focus where fansId in (select user_id from user_token where access_token='${accessToken}')) as countFocusMan from focus where focusId in (select user_id from user_token where access_token='${accessToken}')`;
        return MysqlConnect.query(sql);
    });
}
exports.focusManCountQuery = focusManCountQuery;
//# sourceMappingURL=focusCtrl.js.map