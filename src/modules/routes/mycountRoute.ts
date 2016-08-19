import Router = require("koa-router");
import mycountCtrl = require("./../control/mycountCtrl")

const router = new Router({prefix:"/wx/mycount"});

router.post("/getUserByToken",mycountCtrl.getToken,mycountCtrl.getTokenQuery);

export = router;