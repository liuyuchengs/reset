"use strict";
const Router = require("koa-router");
const focusCtrl = require("./../control/focusCtrl");
const router = new Router({ prefix: "/wx/focus" });
router.post("/focusManCount", focusCtrl.focusManCount, focusCtrl.focusManCountQuery);
module.exports = router;
//# sourceMappingURL=focusRoute.js.map