/// <reference path="./../typings/index.d.ts" />

// system module
import fs = require("fs");
import path = require("path");
import co = require("co");
import Koa = require("koa");
import koaStatic = require("koa-static");
import parser = require("koa-bodyparser");
import favicon = require("koa-favicon");
import morgan = require("koa-morgan");
import ejs = require("koa-ejs");

// router module
import bannerRouter = require('./modules/routes/bannerRoute');
import doctorRouter = require('./modules/routes/doctorRoute');
import focusRouter = require('./modules/routes/focusRoute');
import hospitalRouter = require('./modules/routes/hospitalRoute');
import imageRouter = require('./modules/routes/imageRoute');
import loginRouter = require('./modules/routes/loginRoute');
import mycountRouter = require('./modules/routes/mycountRoute');
import orderRouter = require('./modules/routes/orderRoute');
import scheduleRouter = require('./modules/routes/scheduleRoute');
import productRouter = require('./modules/routes/productRoute');
import testRouter = require("./modules/routes/testRoute");

const app = new Koa();

// global middlewares
app.use(parser());
app.use(async function(ctx:Koa.Context,next:()=>Promise<any>){
    var start = new Date();
    await next();
    var ms:number = (new Date().valueOf() - start.valueOf());
    console.log(`%s %s - %s`,ctx.method,ctx.url,ms);
})
app.use(koaStatic(__dirname+'/public'));
app.use(favicon(__dirname+"/public/contents/img/logo.png"));
app.use(morgan("combined",{
    stream:fs.createWriteStream(__dirname+"/logger/access.log",{flags:"a"})
}));

ejs(app,{
    root:path.join(__dirname+"/views"),
    layout:false,
    viewExt:"html",
    cache:false,
    debug:true
})
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

app.on('error',function(err:Error,ctx:Koa.Context){
    console.log(err);
})

export = app;