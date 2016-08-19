"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Router = require("koa-router");
const MysqlConnect = require("./../modules/MysqlConnect");
const HttpResult = require("./../modules/HttpResult");
/**
 * 项目相关API
 * @module
 */
const router = new Router();
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
function checkParams(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.request.body.currentPage) {
            let result;
            try {
                result = yield next();
                ctx.response.body = HttpResult.CreateSuccessResult(result);
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
function createQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        queryParams.currentPage = ctx.request.body.currentPage;
        let sql = `select p.id,p.title,p.stand_price as standPrice,p.prefer_price as preferPrice,p.pricetype,p.priceunit,p.sales,p.samllimg,p.profession_id,p.hospital_id,h.name as hospitalname 
            from product as p left join hospital as h on p.hospital_id = h.id where p.id in (select product_id from product_ext where param_name = 'recommend') 
            limit ${(queryParams.currentPage - 1) * queryParams.pageRows},${queryParams.currentPage * queryParams.pageRows}`;
        return MysqlConnect.query(sql);
    });
}
router.post("/wx/product/queryrecommend", checkParams, createQuery);
module.exports = router;
//# sourceMappingURL=product.js.map