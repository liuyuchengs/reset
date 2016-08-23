import Koa = require("koa");
import Router = require("koa-router");

const router = new Router();

router.get("/404",async function(ctx:Koa.Context){
    await ctx.render("404");
});

export = router;