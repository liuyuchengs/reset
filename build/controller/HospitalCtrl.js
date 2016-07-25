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
 * 医学相关模块
 * @module
 */
/**
 * 根据医院id查询医院信息
 * @param {number} id - 医院id
 * @returns {Object|Error} 返回查询结果
 */
function queryById(id) {
    return __awaiter(this, void 0, Promise, function* () {
        let sql = "select h.name,h.address,h.description,h.logo from hospital as h where id = " + id;
        try {
            let queryResult = yield MysqlConnect.query(sql);
            return new Promise((resolve) => {
                if (queryResult.length > 0) {
                    resolve(queryResult[0]);
                }
                else {
                    resolve({});
                }
            });
        }
        catch (err) {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        }
    });
}
exports.queryById = queryById;
//# sourceMappingURL=HospitalCtrl.js.map