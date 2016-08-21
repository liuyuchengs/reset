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
function querybyid(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.id) {
            try {
                let queryResult = yield next();
                let result;
                if (queryResult.length > 0) {
                    result = queryResult[0];
                }
                else {
                    result = {};
                }
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
exports.querybyid = querybyid;
function querybyidQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = ctx.request.body.id;
        let sql = `SELECT h.name,h.address,h.description,h.logo FROM hospital as h WHERE id = '${id}'`;
        return MysqlConnect.query(sql);
    });
}
exports.querybyidQuery = querybyidQuery;
//# sourceMappingURL=hospitalCtrl.js.map