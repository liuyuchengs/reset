"use strict";
const Router = require("koa-router");
const hospitalCtrl = require("./../control/hospitalCtrl");
const router = new Router({ prefix: "/wx/hospital" });
router.post("/querybyid", hospitalCtrl.querybyid, hospitalCtrl.querybyidQuery);
module.exports = router;
//# sourceMappingURL=hospitalRoute.js.map