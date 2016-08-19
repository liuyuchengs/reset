import Router = require("koa-router");
import doctorCtrl = require("./../control/doctorCtrl")

const router = new Router({prefix:"/wx/doctor"});

router.post("/queryscheduledoctorbyproductid",doctorCtrl.querySchedule,doctorCtrl.queryScheduleQuery);

export = router;