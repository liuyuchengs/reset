
//配置require脚本
requirejs.config({
    paths:{
        "angular":"../lib/angular.min",
        "angular-route":"../lib/angular.route.min",
        "jquery":"../lib/jquery.min",
        "Swiper":"../lib/swiper.min",
        "WX":"https://res.wx.qq.com/open/js/jweixin-1.0.0",
        "app":"app",
    },
    shim:{
        "angular":{
            exports:"angular"
        },
        "angular-route":{
            deps:['angular'],
            exports:'ngRouteModule',
        },
    },
})

//使用require
requirejs(["angular","angular-route","jquery","Swiper","WX","app",],function(angular:any){
    angular.bootstrap(document,['myApp']);
})
