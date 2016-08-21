"use strict";
const Router = require("koa-router");
const orderCtrl = require("./../control/orderCtrl");
const router = new Router({ prefix: "/wx/order" });
router.post("/checkCodeMoney", orderCtrl.checkCodeMoney, orderCtrl.checkCodeMoneyQuery);
router.post("/make", orderCtrl.make, orderCtrl.makeQuery);
module.exports = router;
//# sourceMappingURL=orderRoute.js.map