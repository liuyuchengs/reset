import Router = require("koa-router");

var router = new Router;

router.get("/",function *(next){
    let value = 10;
    let nextValue = yield next;
    console.log("value:"+(value+nextValue));
    this.body = value+nextValue;
},function *(next){
    let config = 20;
    var nextValue = yield next;
    return config+nextValue;
},function (){
    return 30;
})

export = router;

