"use strict";
const Router = require("koa-router");
const bannerCtrl = require("./../control/bannerCtrl");
/**
 * banner相关API
 * @module
 */
const router = new Router({ prefix: '/wx/banner' });
router.post("/query", bannerCtrl.query, bannerCtrl.queryQuery);
module.exports = router;
//# sourceMappingURL=bannerRoute.js.map