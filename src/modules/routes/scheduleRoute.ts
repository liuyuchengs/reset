import Router = require("koa-router");
import scheduleCtrl = require("./../control/scheduleCtrl");

const router = new Router({prefix:"/wx/schedule"});

router.post("/querybydoctorid",scheduleCtrl.querybydoctorid,scheduleCtrl.querybydoctoridQuery);

export = router;