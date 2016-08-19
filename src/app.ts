/// <reference path="./../typings/index.d.ts" />


// system module
import Koa = require("koa");
import koaStatic = require("koa-static");
import parser = require("koa-bodyparser");

// router module
import productRouter = require('./modules/routes/productRoute');

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
// mount root routes
app.use(productRouter.routes());
app.use(productRouter.allowedMethods());


app.on('error',function(err:Error,ctx:Koa.Context){
    console.log(err);
})

export = app;