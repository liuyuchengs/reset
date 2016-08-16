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
 * 排班相关模块
 * @module
 */
/**
 * 查询医生排班信息
 * @param {number} id - 医生id
 * @returns {Http}
 */
function querybydoctorid(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let date = new Date();
        let sql = `SELECT id as scheduleid,starttime,date as dateStr FROM schedule WHERE doctorid = '${id}' AND YEAR(date)= '${date.getFullYear()}' AND MONTH(date)= '${(date.getMonth() + 1)}' AND DAY(date) >= '${date.getDate()}'`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let queryResult = yield MysqlConnect.query(sql);
                let result = [];
                for (let index in queryResult) {
                    queryResult[index].date = queryResult[index].dateStr.toLocaleDateString() + " " + queryResult[index].starttime.slice(0, 5);
                    queryResult[index].dateStr = queryResult[index].dateStr.toLocaleDateString();
                    if (result.length > 0) {
                        if (result[result.length - 1].date != queryResult[index].dateStr) {
                            result.push({ date: queryResult[index].dateStr, timeList: [] });
                        }
                    }
                    else {
                        result.push({ date: queryResult[index].dateStr, timeList: [] });
                    }
                }
                for (let index in queryResult) {
                    let indexCount = 0;
                    if (result.length > 0) {
                        if (result[indexCount].date != queryResult[index].dateStr) {
                            indexCount++;
                        }
                        result[indexCount].timeList.push(queryResult[index]);
                    }
                }
                resolve(result);
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.querybydoctorid = querybydoctorid;
//# sourceMappingURL=scheduleCtrl.js.map