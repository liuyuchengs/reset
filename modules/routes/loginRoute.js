"use strict";
const Router = require("koa-router");
const loginCtrl = require("./../control/loginCtrl");
const router = new Router({ prefix: "/wx/login" });
router.post("/wxlogin", loginCtrl.wxlogin, loginCtrl.wxloginQuery);
module.exports = router;
//# sourceMappingURL=loginRoute.js.map