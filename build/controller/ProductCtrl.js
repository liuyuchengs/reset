"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const HttpResult = require("./../modules/HttpResult");
const MysqlConnect = require("./../modules/MysqlConnect");
const Tool = require("./../modules/Tool");
/**
 * 项目相关模块
 * @module
 */
let queryParams = {
    city: "深圳",
    area: null,
    professionId: null,
    itemId: null,
    order: null,
    currentPage: 1,
    pageRows: 10,
    location: null
};
/**
 * 查询主页热门项目
 * @params {number} currentPage - 分页的页码
 * @returns {HttpResult} 返回查询结果
 */
function queryRecommend(currentPage) {
    return __awaiter(this, void 0, Promise, function* () {
        queryParams.currentPage = currentPage;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let sql = `select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id,p.hospital_id,h.name as hospitalname 
                from product as p left join hospital as h on p.hospital_id = h.id where p.id in (select product_id from product_ext where param_name = 'recommend') 
                limit ${(queryParams.currentPage - 1) * queryParams.pageRows},${queryParams.currentPage * queryParams.pageRows}`;
            try {
                let queryResult = yield MysqlConnect.query(sql);
                resolve(HttpResult.CreateResult(queryResult, 0, "success"));
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.queryRecommend = queryRecommend;
/**
 * 查询项目页面的项目信息
 * @params {Object} params - request.body
 */
function queryList(params) {
    return __awaiter(this, void 0, void 0, function* () {
        Tool.initObject(params, queryParams);
        let queryResult;
        let hasWhere = false;
        let sql = "select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id as professionId,p.hospital_id as hospitalId,h.name as hospitalname " +
            "from product as p left join hospital as h on p.hospital_id = h.id ";
        if (queryParams.area) {
            !hasWhere ? sql += "where " : "";
            hasWhere ? sql += " and " : "";
            hasWhere = true;
            sql += `h.area = '${queryParams.area}' `;
        }
        if (queryParams.city) {
            !hasWhere ? sql += "where " : "";
            hasWhere ? sql += " and " : "";
            hasWhere = true;
            sql += `h.city = '${queryParams.city}' `;
        }
        if (queryParams.professionId) {
            !hasWhere ? sql += "where " : "";
            hasWhere ? sql += " and " : "";
            hasWhere = true;
            sql += `p.type = '${queryParams.professionId}' `;
        }
        if (queryParams.itemId) {
            !hasWhere ? sql += "where " : "";
            hasWhere ? sql += " and " : "";
            hasWhere = true;
            sql += `p.profession_id = '${queryParams.itemId}' `;
        }
        if (queryParams.order) {
            if (queryParams.order === "prefer_price asc") {
                sql += "order by p.prefer_price asc ";
            }
            if (queryParams.order === "prefer_price desc") {
                sql += "order by p.prefer_price desc ";
            }
            if (queryParams.order === "hospital_score asc ") {
                sql += "order by h.score desc ";
            }
            if (queryParams.order === "sales desc") {
                sql += "order by p.sales desc ";
            }
        }
        sql += `limit ${(queryParams.currentPage - 1) * queryParams.pageRows},${queryParams.currentPage * queryParams.pageRows}`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                queryResult = yield MysqlConnect.query(sql);
                // 为了兼容之前java后台数据格式，需对数据进行改动
                for (let item of queryResult) {
                    item.hospital = {
                        "name": item.hospitalname,
                    };
                }
                resolve(queryResult);
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.queryList = queryList;
/**
 * 查询项目详情页面的
 * @param {Object} params - req.body
 */
function querybyid(params) {
    return __awaiter(this, void 0, Promise, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let productId = params.productId || null;
            let accessToken = params.accessToken || null;
            let focusSql = null;
            let productSql = `select p.id,p.title,p.introduction,p.hospital_id as hospitalId,p.pricetype,p.priceunit,p.samllimg,p.sales,p.stand_price as standPrice,p.prefer_price as preferPrice,p.samllimg,
                (select count(*) from focus where flag = 3 and focusId = '${productId}' and fansId in (select user_id from user_token where access_token = '${accessToken}')) as focusCount from product as p where id = '${productId}'`;
            try {
                let productResult = yield MysqlConnect.query(productSql);
                resolve(HttpResult.CreateSuccessResult(productResult[0]));
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.querybyid = querybyid;
//# sourceMappingURL=ProductCtrl.js.map