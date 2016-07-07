/// <reference path="./../../../../typings/index.d.ts" />
import ag = require("angular");
import Tool = require("./../modules/Tool");
import Ajax = require("./../modules/Ajax");
declare interface query extends IQueryParams{
    flag:number
}

declare interface TScope implements angular.IScope{
    queryParams:query,
    
}



function activity($scope:any,$rootScope:IRootScope,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax) {
    $scope.queryParams = {
        pageRows:10,
        currentPage:1,
        flag:null,
    }
    $scope.noProduct = false;
    $scope.noProductText = "";
    $scope.products = [];

    //页面初始化
    $scope.init = ()=>{
        $rootScope.hasBgColor = false;
        if($location.search().flag){
            $scope.queryParams.flag = 
        }
    }
}

export = activity;