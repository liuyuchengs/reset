"use strict";
const Router = require("koa-router");
const imageCtrl = require("./../control/imageCtrl");
const router = new Router({ prefix: "/wx/image" });
router.post("/querybymainid", imageCtrl.querybyid, imageCtrl.querybyidQuery);
module.exports = router;
//# sourceMappingURL=imageRoute.js.map