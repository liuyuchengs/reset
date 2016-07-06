/// <reference path="./../../../typings/index.d.ts" />

import angular = require("angular");
import Tool = require("./modules/Tool");

let host:string = "https://www.uokang.com";

var app = angular.module("myApp",['ngRoute']);
app.run(["$rootScope","$location",function($rootScope:IRootScope,$location:angular.ILocationService){
    $rootScope.navMenuParams = {
        home:false,
        doctor:false,
        interaction:false,
        user:false
    }
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
    $rootScope.switchNavMenu = function(item:string){
        for(let prop in $rootScope.navMenuParams){
             
        }
    }

    //导航栏菜单处理事件
    $rootScope.menuClick = function(path:string){
        $location.path(path);
    }

}])

/**
 * 工具服务
 */
app.factory("ToolService",($rootScope:IRootScope,$location:angular.ILocationService)=>new Tool($rootScope,$location,host));

/**
 * 数据服务
 */



export = app;
