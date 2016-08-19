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
 * 医生相关模块
 * @module
 * @pamra {number} id - 项目id
 * @returns {Object} 返回查询结果
 */
function querySchedule(id) {
    return __awaiter(this, void 0, Promise, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let date = new Date();
            let sql = `SELECT d.id,d.doctorname,d.hobby,d.score,d.hospitalid,d.face FROM doctor as d WHERE d.id in (SELECT doctorid FROM schedule WHERE hospital_id in (SELECT hospital_id FROM product WHERE id = '${id}') AND YEAR(date)= '${date.getFullYear()}' AND MONTH(date)= '${(date.getMonth() + 1)}' AND DAY(date) >= '${date.getDate()}')`;
            try {
                let queryResult = yield MysqlConnect.query(sql);
                resolve({ list: queryResult });
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.querySchedule = querySchedule;
//# sourceMappingURL=DoctorCtrl.js.map