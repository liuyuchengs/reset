"use strict";
const Router = require("koa-router");
const productCtrl = require("./../control/productCtrl");
/**
 * 项目相关API
 * @module
 */
const router = new Router({ prefix: '/wx/product' });
router.post("/queryrecommend", productCtrl.commend, productCtrl.commendQuery);
router.post("/querylist", productCtrl.queryList, productCtrl.queryListQuery);
router.post("/querybyid", productCtrl.querybyid, productCtrl.querybyidQuery);
module.exports = router;
//# sourceMappingURL=productRoute.js.map