"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const MysqlConnect = require("./../modules/MysqlConnect");
/**
 * 图片查询相关模块
 * @module
 */
/**
 * 查询医院或者项目图片
 * @param {any} params - 经过express parser转换后的req.body,需有mainId和type属性
 * @returns {HttpResult} 查询结果，异常时返回error异常对象
 */
function queryImage(params) {
    return __awaiter(this, void 0, Promise, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let sql = null;
            if (params.type === "PRODUCT") {
                sql = `select path as url from product_image where flag = 1 and productid = '${params.mainId}'`;
            }
            else if (params.type === "HOSPITAL") {
                sql = `select path as url from hospital_image where hospital_id = '${params.mainId}'`;
            }
            if (sql) {
                try {
                    let result = yield MysqlConnect.query(sql);
                    resolve(result);
                }
                catch (err) {
                    reject(err);
                }
            }
            else {
                reject(new Error("type参数错误"));
            }
        }));
    });
}
exports.queryImage = queryImage;
//# sourceMappingURL=ImageCtrl.js.map