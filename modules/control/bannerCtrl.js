"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const MysqlConnect = require("./../base/MysqlConnect");
const HttpResult = require("./../base/HttpResult");
function query(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.type === "home_banner") {
            try {
                let result = yield next();
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
exports.query = query;
function queryQuery(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let type = ctx.request.body.type;
        let host = ctx.request.header["origin"];
        let sql = `select path from tb_image_banner where type = '${type}'`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let sqlResult = yield MysqlConnect.query(sql);
                if (sqlResult.length && sqlResult.length > 0) {
                    for (let index in sqlResult) {
                        sqlResult[index].path = host + sqlResult[index].path;
                    }
                }
                resolve(sqlResult);
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.queryQuery = queryQuery;
//# sourceMappingURL=bannerCtrl.js.map