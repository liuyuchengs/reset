import Router = require("koa-router");
import orderCtrl = require("./../control/orderCtrl");

const router = new Router({prefix:"/wx/order"});

router.post("/checkCodeMoney",orderCtrl.checkCodeMoney,orderCtrl.checkCodeMoneyQuery);
router.post("/make",orderCtrl.make,orderCtrl.makeQuery);

export = router;