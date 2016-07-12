/// <reference path="./../typings/index.d.ts" />
"use strict";
const koa = require("koa");
const koaBody = require("koa-bodyparser");
const koaStatic = require("koa-static");
let app = new koa();
app.use(koaStatic("./public"));
app.use(koaBody());
app.listen(3000, () => {
    console.log("koa is run");
});
