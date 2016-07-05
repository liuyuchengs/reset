/// <reference path="./../../../typings/index.d.ts" />

import angular = require("angular");
import User = require("./modules/User");
import Tool = require("./modules/Tool");
var app = angular.module("myApp",['ngRoute']);
app.run(["$rootScope","$location",function($rootScope:any,$location:angular.ILocationService){
    $rootScope.navMenuParams = {
        home:false,
        doctor:false,
        interaction:false,
        user:false,
    }
    $rootScope.hasNav = false;

    //导航栏菜单处理事件
    $rootScope.menuClick = function(item:string){
        $location.path(item);
        Tool.getLocal
    }
}])

export = app;
