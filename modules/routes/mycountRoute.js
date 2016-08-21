"use strict";
const Router = require("koa-router");
const mycountCtrl = require("./../control/mycountCtrl");
const router = new Router({ prefix: "/wx/mycount" });
router.post("/getUserByToken", mycountCtrl.getToken, mycountCtrl.getTokenQuery);
module.exports = router;
//# sourceMappingURL=mycountRoute.js.map