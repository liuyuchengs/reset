import Router = require("koa-router");
import productCtrl = require("./../control/productCtrl");

const router = new Router({prefix:"/wx/order"});

router.post("/checkCodeMoney");


export = router;