import Router = require("koa-router");
import focusCtrl = require("./../control/focusCtrl")

const router = new Router({prefix:"/wx/focus"});

router.post("/focusManCount",focusCtrl.focusManCount,focusCtrl.focusManCountQuery);

export = router;