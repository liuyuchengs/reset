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
const fs = require("fs");
const path = require("path");
const co = require("co");
const Koa = require("koa");
const koaStatic = require("koa-static");
const parser = require("koa-bodyparser");
const favicon = require("koa-favicon");
const morgan = require("koa-morgan");
const ejs = require("koa-ejs");
// router module
const bannerRouter = require('./modules/routes/bannerRoute');
const doctorRouter = require('./modules/routes/doctorRoute');
const focusRouter = require('./modules/routes/focusRoute');
const hospitalRouter = require('./modules/routes/hospitalRoute');
const imageRouter = require('./modules/routes/imageRoute');
const loginRouter = require('./modules/routes/loginRoute');
const mycountRouter = require('./modules/routes/mycountRoute');
const orderRouter = require('./modules/routes/orderRoute');
const scheduleRouter = require('./modules/routes/scheduleRoute');
const productRouter = require('./modules/routes/productRoute');
const testRouter = require("./modules/routes/testRoute");
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
app.use(favicon(__dirname + "/public/contents/img/logo.png"));
app.use(morgan("combined", {
    stream: fs.createWriteStream(__dirname + "/logger/access.log", { flags: "a" })
}));
ejs(app, {
    root: path.join(__dirname + "/views"),
    layout: false,
    viewExt: "html",
    cache: false,
    debug: true
});
app.context.render = co.wrap(app.context.render);
// mount root routes
app.use(productRouter.routes());
app.use(productRouter.allowedMethods());
app.use(bannerRouter.routes());
app.use(bannerRouter.allowedMethods());
app.use(doctorRouter.routes());
app.use(doctorRouter.allowedMethods());
app.use(focusRouter.routes());
app.use(focusRouter.allowedMethods());
app.use(hospitalRouter.routes());
app.use(hospitalRouter.allowedMethods());
app.use(imageRouter.routes());
app.use(imageRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.routes());
app.use(mycountRouter.routes());
app.use(mycountRouter.allowedMethods());
app.use(orderRouter.routes());
app.use(orderRouter.allowedMethods());
app.use(scheduleRouter.routes());
app.use(scheduleRouter.allowedMethods());
app.use(testRouter.routes());
app.use(testRouter.allowedMethods());
app.on('error', function (err, ctx) {
    console.log(err);
});
module.exports = app;
//# sourceMappingURL=app.js.map