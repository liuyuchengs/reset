import Router = require("koa-router");
import loginCtrl = require("./../control/loginCtrl")

const router = new Router({prefix:"/wx/login"});

router.post("/wxlogin",loginCtrl.wxlogin,loginCtrl.wxloginQuery);

export = router;