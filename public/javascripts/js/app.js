/// <reference path="./../../../typings/index.d.ts" />
define(["require", "exports", "angular", "./modules/Tool"], function (require, exports, angular, Tool) {
    "use strict";
    var host = "https://www.uokang.com";
    var app = angular.module("myApp", ['ngRoute']);
    app.run(["$rootScope", "$location", function ($rootScope, $location) {
            $rootScope.navMenuParams = {
                home: false,
                doctor: false,
                interaction: false,
                user: false
            };
            $rootScope.hasNav = false;
            //加载框参数
            $rootScope.loading = false;
            //提示框参数
            $rootScope.message = null;
            $rootScope.hasCancel = null;
            $rootScope.hasComfirm = null;
            $rootScope.hasTip = null;
            $rootScope.comfirm = null;
            $rootScope.cancel = null;
            //body背景色
            $rootScope.hasBgColor = false;
            //获取url决定导航栏样式
            $rootScope.switchNavMenu = function (item) {
                for (var prop in $rootScope.navMenuParams) {
                }
            };
            //导航栏菜单处理事件
            $rootScope.menuClick = function (path) {
                $location.path(path);
            };
        }]);
    /**
     * 工具服务
     */
    app.factory("ToolService", function ($rootScope, $location) { return new Tool($rootScope, $location, host); });
    return app;
});
