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
const Tool = require("./../base/Tool");
function querybydoctorid(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Tool.checkObjectPropsEmpty(ctx.request.body, ["doctorId"])) {
            ctx.throw(400);
        }
        else {
            try {
                let result = yield next();
                ctx.response.body = result;
            }
            catch (err) {
                console.log(err);
                ctx.throw(500);
            }
        }
    });
}
exports.querybydoctorid = querybydoctorid;
function querybydoctoridQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = ctx.request.body.doctorId;
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
exports.querybydoctoridQuery = querybydoctoridQuery;
//# sourceMappingURL=scheduleCtrl.js.map