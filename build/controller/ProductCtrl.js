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
 * ProductCtrl
 */
class ProductCtrl {
    constructor(queryParams) {
        if (queryParams === null || queryParams === undefined) {
            this.queryParams = {
                city: "深圳",
                area: null,
                professionId: null,
                itemId: null,
                order: null,
                currentPage: 1,
                pageRows: 10,
                location: null
            };
        }
        else {
            this.queryParams = queryParams;
        }
    }
    /**
     * 查询主页热门项目
     * @params currentPage->分页的当前页数
     */
    queryRecommend(currentPage) {
        return __awaiter(this, void 0, Promise, function* () {
            this.queryParams.currentPage = currentPage;
            let sql = "select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id,p.hospital_id,h.name as hospitalname " +
                "from product as p left join hospital as h on p.hospital_id = h.id where p.id in (select product_id from product_ext where param_name = 'recommend') " +
                "limit " + (this.queryParams.currentPage - 1) * this.queryParams.pageRows + "," + this.queryParams.currentPage * this.queryParams.pageRows;
            try {
                let queryResult = yield MysqlConnect.query(sql);
                return new Promise((resolve) => {
                    resolve(HttpResult.CreateResult(queryResult, 0, "success"));
                });
            }
            catch (err) {
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            }
        });
    }
    /**
     * 查询项目页面的项目信息
     * @params params->request.body
     */
    queryList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            Tool.initObject(params, this.queryParams);
            let queryResult;
            let hasWhere = false;
            let sql = "select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id as professionId,p.hospital_id as hospitalId,h.name as hospitalname " +
                "from product as p left join hospital as h on p.hospital_id = h.id ";
            if (this.queryParams.area) {
                !hasWhere ? sql += "where " : "";
                hasWhere ? sql += " and " : "";
                hasWhere = true;
                sql += "h.area = '" + this.queryParams.area + "' ";
            }
            if (this.queryParams.city) {
                !hasWhere ? sql += "where " : "";
                hasWhere ? sql += " and " : "";
                hasWhere = true;
                sql += "h.city = '" + this.queryParams.city + "' ";
            }
            if (this.queryParams.professionId) {
                !hasWhere ? sql += "where " : "";
                hasWhere ? sql += " and " : "";
                hasWhere = true;
                sql += "p.type = " + this.queryParams.professionId + " ";
            }
            if (this.queryParams.itemId) {
                !hasWhere ? sql += "where " : "";
                hasWhere ? sql += " and " : "";
                hasWhere = true;
                sql += "p.profession_id = " + this.queryParams.itemId + " ";
            }
            if (this.queryParams.order) {
                if (this.queryParams.order === "prefer_price asc") {
                    sql += "order by p.prefer_price asc ";
                }
                if (this.queryParams.order === "prefer_price desc") {
                    sql += "order by p.prefer_price desc ";
                }
                if (this.queryParams.order === "hospital_score asc ") {
                    sql += "order by h.score desc ";
                }
                if (this.queryParams.order === "sales desc") {
                    sql += "order by p.sales desc ";
                }
            }
            sql += "limit " + (this.queryParams.currentPage - 1) * this.queryParams.pageRows + "," + this.queryParams.currentPage * this.queryParams.pageRows;
            try {
                queryResult = yield MysqlConnect.query(sql);
                // 为了兼容之前java后台数据格式，需对数据进行改动
                for (let item of queryResult) {
                    item.hospital = {
                        "name": item.hospitalname,
                    };
                }
                if (queryResult.hospitalname) {
                    queryResult;
                }
                return new Promise((resolve) => {
                    resolve(queryResult);
                });
            }
            catch (err) {
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            }
        });
    }
    /**
     * 查询项目详情页面的
     */
    querybyid(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let productId = params.productId || null;
            let accessToken = params.accessToken || null;
            let focusSql = null;
            let productSql = "select p.id,p.title,p.introduction,p.hospital_id as hospitalId,p.pricetype,p.priceunit,p.samllimg,p.sales,p.stand_price as standPrice,p.prefer_price as preferPrice,p.samllimg," +
                "(select count(*) from focus where flag = 3 and focusId = '" + productId + "' and fansId in (select user_id from user_token where access_token = '" + accessToken + "')) as focusCount from product as p where id = '" + productId + "'";
            try {
                let productResult = yield MysqlConnect.query(productSql);
                return new Promise((resolve) => {
                    resolve(HttpResult.CreateSuccessResult(productResult[0]));
                });
            }
            catch (err) {
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            }
        });
    }
}
module.exports = ProductCtrl;

//# sourceMappingURL=ProductCtrl.js.map
