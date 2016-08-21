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
function querybyid(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.type && ctx.request.body.mainId) {
            try {
                let result = yield next();
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
        let params = ctx.request.body;
        let sql = null;
        if (params.type === "PRODUCT") {
            sql = `select path as url from product_image where flag = 1 and productid = '${params.mainId}'`;
        }
        else if (params.type === "HOSPITAL") {
            sql = `select path as url from hospital_image where hospital_id = '${params.mainId}'`;
        }
        if (sql) {
            return MysqlConnect.query(sql);
        }
        else {
            return new Error("type参数错误");
        }
    });
}
exports.querybyidQuery = querybyidQuery;
//# sourceMappingURL=imageCtrl.js.map