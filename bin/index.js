var koa = require("koa"); //koa框架
var bodyparser = require("koa-bodyparser"); //koa的request和response转换
var serverStatic = require("koa-static"); //静态文件服务目录
var router = require("./../routes/js/mainRoute.js"); //路由模块
var app = koa();

//配置
app.use(serverStatic("./public"));
app.use(bodyparser());
app.use(router.routes());


//监听端口
app.listen(3000,function(){
    console.log("koa is run");
});