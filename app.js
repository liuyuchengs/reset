/// <reference path="./../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// system module
const Koa = require("koa");
const koaStatic = require("koa-static");
const parser = require("koa-bodyparser");
// router module
const productRouter = require('./modules/routes/productRoute');
const app = new Koa();
// global middlewares
app.use(parser());
app.use(function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var start = new Date();
        yield next();
        var ms = (new Date().valueOf() - start.valueOf());
        console.log(`%s %s - %s`, ctx.method, ctx.url, ms);
    });
});
app.use(koaStatic(__dirname + '/public'));
// mount root routes
app.use(productRouter.routes());
app.use(productRouter.allowedMethods());
app.on('error', function (err, ctx) {
    console.log(err);
});
module.exports = app;
//# sourceMappingURL=app.js.map