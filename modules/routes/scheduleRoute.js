"use strict";
const Router = require("koa-router");
const scheduleCtrl = require("./../control/scheduleCtrl");
const router = new Router({ prefix: "/wx/schedule" });
router.post("/querybydoctorid", scheduleCtrl.querybydoctorid, scheduleCtrl.querybydoctoridQuery);
module.exports = router;
//# sourceMappingURL=scheduleRoute.js.map