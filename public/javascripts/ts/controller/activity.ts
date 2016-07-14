/// <reference path="./../../../../typings/index.d.ts" />
import Data = require("Data");
import IRootScope = require("IRootScope");
import ag = require("angular");
import Tool = require("./../modules/Tool");
import Ajax = require("./../modules/Ajax");

function activity($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax) {
    $scope.products = [];

    //跳转到详情页面
    $scope.detail = (productId:any,hospitalId:any,type:any)=>{
        if(productId&&hospitalId&&type){
            if(type===5){
                ToolService.changeRoute("/exam/detail","productId="+productId+"&hospitalId="+hospitalId);
            }if(type===6){
                ToolService.changeRoute("/exam/detail","productId="+productId+"&hospitalId="+hospitalId+"&activityp=元/次");
            }else{
                ToolService.changeRoute("/product/detail","productId="+productId+"&hospitalId="+hospitalId);
            }
        }
    }
    
    let queryParams = {
        pageRows:10,
        currentPage:1,
        flag:"",
    }

    //查询活动数据
    let queryActivity = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/product/queryActivity",
            data:queryParams,
        }).then((data)=>{
            if(data.code === 0){
                if(data.data.length<1){
                    if($scope.products.length<1){
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }else{
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }else{
                    mergeActivity(data.data);
                    $scope.products = $scope.products.concat(data.data);
                }
            }
        }).catch(()=>{
            ToolService.alert("获取数据失败");
        }).finally(()=>{
            $rootScope.load.has = false;
        })
    }

    //处理活动数据
    let mergeActivity = (items:any)=>{
        items.forEach((item:any)=>{
            if(item.priceunit!=null&&item.priceunit!=""){
                item.preferPriceType = item.pricetype+"/"+item.priceunit;
            }else{
                item.preferPriceType = item.pricetype;
            }
            if(item.type===6){
                item.hasActivity = true;
            }
        })
    }

    //加载下一页数据
    let loadNext = ()=>{
        queryParams.currentPage++;
        queryActivity();
    }

    //页面初始化
    $rootScope.globalProp.hasBgColor = false;
    $rootScope.followTip.has = false;
    $rootScope.followTip.val = "";
    if($location.search().flag){
        queryParams.flag = $location.search().flag;
        queryActivity();
        ToolService.onWindowListen(loadNext);
    }else{
        ToolService.changeRoute("/home");
    }
}

export = activity;