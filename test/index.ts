/// <reference path="./../typings/index.d.ts" />

import koa = require("koa");
import koaBody = require("koa-bodyparser");
import koaStatic = require("koa-static");
import koaRouter = require("koa-router");

let app = new koa();

app.use(koaStatic("./public"));
app.use(koaBody());

app.listen(3000,()=>{
    console.log("koa is run");
})