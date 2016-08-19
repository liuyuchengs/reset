import Router = require("koa-router");
import imageCtrl = require("./../control/imageCtrl")

const router = new Router({prefix:"/wx/image"});

router.post("/querybymainid",imageCtrl.querybyid,imageCtrl.querybyidQuery);

export = router;