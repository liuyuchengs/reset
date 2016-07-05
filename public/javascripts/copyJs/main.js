/**
 * requirejs 入口
 */

//配置require
require.config({
    paths:{
        "angular":"../lib/angular.min",
        "angular-route":"../lib/angular.route.min",
        "jquery":"../lib/jquery.min",
        "swiper":"../lib/swiper.min",
        "wx":"https://res.wx.qq.com/open/js/jweixin-1.0.0",
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
requirejs(["angular","app","angular-route","jquery","swiper"],function(angular){
    angular.bootstrap(document,['myApp']);
})