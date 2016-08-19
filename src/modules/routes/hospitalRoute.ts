import Router = require("koa-router");
import hospitalCtrl = require("./../control/hospitalCtrl")

const router = new Router({prefix:"/wx/hospital"});

router.post("/querybyid",hospitalCtrl.querybyid,hospitalCtrl.querybyidQuery);

export = router;