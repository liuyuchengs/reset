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
const Tool = require("./../base/Tool");
function checkCodeMoney(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.productId) {
            try {
                let result;
                let queryResult = yield next();
                if (queryResult.length > 0) {
                    result = queryResult[0];
                }
                else {
                    result = {};
                }
                ctx.response.body = result;
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
exports.checkCodeMoney = checkCodeMoney;
function checkCodeMoneyQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let productId = ctx.request.body.productId;
        let sql = `SELECT prefer_price as realMoney, prefer_price*0.1 as dealMoney,prefer_price*0.9 as payMoney,0 as giftMoney FROM product WHERE id = '${productId}'`;
        return yield MysqlConnect.query(sql);
    });
}
exports.checkCodeMoneyQuery = checkCodeMoneyQuery;
function make(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Tool.checkObjectPropsEmpty(ctx.request.body, ["productId", "scheduleId", "patientName", "patientTelephone", "dealMoney", "realMoney", "payMoney"])) {
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
exports.make = make;
function makeQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let body = ctx.request.body;
        let headers = ctx.request.header;
        let orderNo = convertDate(new Date());
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let userId;
                let schedule;
                let queryUserId = yield MysqlConnect.query(`SELECT id FROM alluser WHERE access_token = '${headers.accesstoken}'`);
                if (queryUserId.length > 0) {
                    userId = queryUserId[0].id;
                }
                else {
                    resolve(HttpResult.CreateFailResult("用户信息异常"));
                }
                let querySchedule = yield MysqlConnect.query(`SELECT doctorId,hospital_id as hospitalId,date,starttime as time FROM schedule WHERE id = '${body.scheduleId}'`);
                if (querySchedule.length > 0) {
                    schedule = querySchedule[0];
                }
                else {
                    resolve(HttpResult.CreateSuccessResult("排班信息异常"));
                }
                let makeOrderSql = `INSERT INTO order_main (orderno, user_id, vistor_id, usertype, doctor_id, hospital_id, createtime, status, optype, productType,orderSource, product_id, scheduleid, treatmenttime, originalprice, discountprice, telephone, operatorid,isReviewDoctor,isReviewhospital, isAllowReDoctor, isAllowReHospital, isAllowAsk, isAllowUploadBill,payStatus, dealMoney, payMoney, giftMoney) VALUES('${orderNo}','${userId}', '${userId}', '4', '${schedule.doctorId}', '${schedule.hospitalId}', current_timestamp(), '0', '4', '2', '1', '${body.productId}', '${body.scheduleId}','${schedule.date.toLocaleDateString()} ${schedule.time}', '${body.realMoney}', '${body.realMoney}', '${body.patientTelephone}', '${userId}', '0', '0', '1', '1', '0', '1', '0', '${body.dealMoney}', '${body.payMoney}', '${body.realMoney - body.payMoney - body.dealMoney}')`;
                let makeOrderResult = yield MysqlConnect.query(makeOrderSql);
                if (makeOrderResult.insertId > 0) {
                    MysqlConnect.query(`UPDATE schedule SET status = '0' WHERE id = '${body.scheduleId}'`);
                    let queryOrderSql = `SELECT * FROM order_main WHERE id = '${makeOrderResult.insertId}'`;
                    let result = yield MysqlConnect.query(queryOrderSql);
                    resolve(HttpResult.CreateSuccessResult(result));
                }
                else {
                    resolve(HttpResult.CreateFailResult("创建订单失败!"));
                }
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.makeQuery = makeQuery;
function convertDate(date) {
    return "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
}
//# sourceMappingURL=orderCtrl.js.map