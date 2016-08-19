import Router = require("koa-router");
import bannerCtrl = require("./../control/bannerCtrl");

/**
 * banner相关API
 * @module
 */
const router = new Router({prefix:'/wx/banner'});

router.post("/query",bannerCtrl.query,bannerCtrl.queryQuery);

export = router;