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
        let sql = `SELECT id as scheduleid,starttime,date as dateStr FROM schedule WHERE status = '1' AND doctorid = '${id}' AND YEAR(date)= '${date.getFullYear()}' AND MONTH(date)= '${(date.getMonth() + 1)}' AND DAY(date) >= '${date.getDate()}'`;
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
                let indexCount = 0;
                for (let index in queryResult) {
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
function autoSchedule(days, times) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let doctors = yield MysqlConnect.query("SELECT id,hospitalId FROM doctor WHERE hospitalid in (SELECT id from hospital where code not like 'ESZ%')");
                let sql = "INSERT INTO schedule(doctorid,starttime,status,hospital_id,number_limit,remain,date) values";
                for (let i1 in doctors) {
                    let doctorId = doctors[i1].id;
                    let hospitalId = doctors[i1].hospitalId;
                    for (let i2 in days) {
                        for (let i3 in times) {
                            sql += `('${doctorId}','${times[i3]}',1,'${hospitalId}',1,0,'${days[i2]}'),`;
                        }
                    }
                    sql = sql.slice(0, sql.length - 1);
                    let result = yield MysqlConnect.query(sql);
                    sql = "INSERT INTO schedule(doctorid,starttime,status,hospital_id,number_limit,remain,date) values";
                }
                resolve("success");
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.autoSchedule = autoSchedule;
//# sourceMappingURL=scheduleCtrl.js.map