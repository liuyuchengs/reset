//配置require脚本
require.config({
    paths: {
        "angular": "../lib/angular.min",
        "angular-route": "../lib/angular.route.min",
        "jquery": "../lib/jquery.min",
        "Swiper": "../lib/swiper.min",
        "wx": "https://res.wx.qq.com/open/js/jweixin-1.0.0",
        "app": "app",
        "Ajax": "modules/Ajax",
        "Tool": "modules/Tool",
        "Weixin": "modules/Weixin",
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-route": {
            deps: ['angular'],
            exports: 'ngRouteModule',
        },
    },
});
//使用require
requirejs(["angular", "app", "angular-route", "jquery", "Swiper"], function (angular) {
    angular.bootstrap(document, ['myApp']);
});
