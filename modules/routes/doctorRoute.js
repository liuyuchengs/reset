"use strict";
const Router = require("koa-router");
const doctorCtrl = require("./../control/doctorCtrl");
const router = new Router({ prefix: "/wx/doctor" });
router.post("/queryscheduledoctorbyproductid", doctorCtrl.querySchedule, doctorCtrl.queryScheduleQuery);
module.exports = router;
//# sourceMappingURL=doctorRoute.js.map