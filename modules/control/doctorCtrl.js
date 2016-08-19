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
/**
 * 查询项目的排班信息中间件 - 处理请求
 * @param {string} productId - 项目id
 * @returns {Object|Error} - 返回查询结果
 */
function querySchedule(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.productId) {
            try {
                let result = yield next();
                ctx.response.body = { list: result };
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
exports.querySchedule = querySchedule;
/**
 * 查询项目的排班信息中间件 - 处理请求
 * @param {string} productId - 项目id
 * @returns {Promise<any>} - 返回查询结果
 */
function queryScheduleQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = ctx.request.body.productId;
        let date = new Date();
        let sql = `SELECT d.id,d.doctorname,d.hobby,d.score,d.hospitalid,d.face FROM doctor as d WHERE d.id in (SELECT doctorid FROM schedule WHERE hospital_id in (SELECT hospital_id FROM product WHERE id = '${id}') AND YEAR(date)= '${date.getFullYear()}' AND MONTH(date)= '${(date.getMonth() + 1)}' AND DAY(date) >= '${date.getDate()}')`;
        return MysqlConnect.query(sql);
    });
}
exports.queryScheduleQuery = queryScheduleQuery;
//# sourceMappingURL=doctorCtrl.js.map