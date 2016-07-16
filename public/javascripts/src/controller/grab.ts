import ag = require("angular");
import IRootScope = require("IRootScope");
import Tool = require("../modules/Tool");
import Ajax = require("../modules/Ajax");
import Weixin = require("../modules/Weixin");

function grab($scope:any,$rootScope:IRootScope.rootScope,$window:ag.IWindowService,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax,WeixinService:Weixin){
    $scope.queryParams = {
        dayDate:"",
        professionId:2,
        city:"深圳",
        currentPage:1,
        area:"",
    }
    $scope.grabs=[];

    //数据加载动画
    $scope.hasBg = false;
    $scope.noGrab = false;
    $scope.noProductText = "";
    $scope.loading = false;
    //菜单切换变量
    $scope.hasDate = false;
    $scope.hasArea = false;
    $scope.hasClass = false;
    //是否显示分享窗口
    $scope.showTip = false;
    $scope.shareObj = {
        title:"悠康医生是信息就医平台。",
        desc:"用悠康，有健康。悠康医生为您提供各类优惠医疗项目，快来看看吧!",
        link:"https://www.uokang.com/mobile/htmls/index.html#/home",
        imgUrl:"https://www.uokang.com/new/contents/img/logo.png",
        success:function(){
            ToolService.setLocal("share","true");
            $scope.switchTip("close");
        },
        cancel:function(){}
    }
    //菜单项变量
    $scope.menuParams = [
        {has:false,val:"区域"},
        {has:false,val:"分类"},
        {has:false,val:"日期"}
    ]
    $scope.areaParams = ToolService.areaParams;
    $scope.dateParams={};
    $scope.classParams = [
        {has:true,val:"洁牙",id:2},
        {has:false,val:"美容",id:3},
        {has:false,val:"推拿",id:6},
    ]

    // 获取url参数
    $scope.getQueryParams = function(){
        if($location.search().item){
            if($location.search().item=="meirong"){
                $scope.queryParams.professionId = 3;
            }
        }
    }

    // 加载日期时间
    $scope.loadDate = function(callback){
        AjaxService.get({
            url:ToolService.host+"/wx/gift/querydate",
        }).then(function(data){
            for(var i in data){
                var item = data[i];
                if(i==0){
                    $scope.dateParams[item.value] = {
                        has:true,val:item.value
                    }
                    $scope.queryParams.dayDate = item.value;
                }else{
                    $scope.dateParams[item.value]= {
                        has:false,val:item.value
                    };
                }
            }
            callback();
        }).catch(function(){
            ToolService.alert("时间加载异常，请稍后再试！");
        }).finally(function(){
            $rootScope.loading =false;
        })
    }

    // 切换下拉菜单
    $scope.switchMenu =function(menu){
        switch(menu){
            case "area":
                if($scope.hasDate){
                    $scope.hasDate = false;
                    $scope.menuParams.date = false;
                };
                if($scope.hasClass){
                    $scope.hasClass = false;
                    $scope.menuParams.classes = false;
                };
                $scope.hasArea = !$scope.hasArea;
                $scope.noGrab = false;
                if($scope.hasArea){
                    $scope.menuParams.area = true;
                }else{
                    $scope.menuParams.area = false;
                }
                break;
            case "date":
                if($scope.hasArea){
                    $scope.hasArea = false;
                    $scope.menuParams.area = false;
                };
                if($scope.hasClass){
                    $scope.hasClass = false;
                    $scope.menuParams.classes = false;
                };
                $scope.hasDate = !$scope.hasDate;
                $scope.noGrab = false;
                if($scope.hasDate){
                    $scope.menuParams.date = true;
                }else{
                    $scope.menuParams.date = false;
                }
                break;
            case "class":
                if($scope.hasDate){
                    $scope.hasDate = false;
                    $scope.menuParams.date = false;
                };
                if($scope.hasArea){
                    $scope.hasArea = false;
                    $scope.menuParams.area = false;
                };
                $scope.hasClass = !$scope.hasClass;
                $scope.noGrab = false;
                if($scope.hasClass){
                    $scope.menuParams.classes = true;
                }else{
                    $scope.menuParams.classes = false;
                }
                break;
        }
        if($scope.hasDate||$scope.hasArea||$scope.hasClass){
            $scope.hasBg = true;
        }else{
            $scope.hasBg = false;
        }
    }

    // 时间下拉菜单项点击
    $scope.dateSelect = function(params){
        ToolService.select(params,$scope.dateParams);
        $scope.queryParams.dayDate = params;
        $scope.queryParams.currentPage = 1;
        $scope.grabs=[];
        $scope.loadData();
        $scope.switchMenu("date");
    }

    // 区域下拉菜单项点击
    $scope.areaSelect =function(params){
        ToolService.select(params,$scope.areaParams);
        $scope.queryParams.area = $scope.areaParams[params].val;
        $scope.queryParams.currentPage = 1;
        $scope.grabs=[];
        $scope.loadData();
        $scope.switchMenu("area");
    }

    // 分类下拉菜单项点击
    $scope.classSelect = function(params){
        ToolService.select(params,$scope.classParams);
        $scope.queryParams.professionId = $scope.classParams[params].id;
        $scope.queryParams.currentPage = 1;
        $scope.grabs=[];
        $scope.loadData();
        $scope.switchMenu("class");
    }

    // 加载数据
    $scope.loadData = function(){
        AjaxService.post({
            url:ToolService.host+"/wx/gift/queryproduct",
            params:$scope.queryParams
        }).then(function(data){
            if(data.length<1){
                if($scope.grabs.length<1){
                    $scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
                }else{
                    $scope.noProductText = "已经没有项目了!";
                }
                $scope.noGrab = true;
            }else{
                $scope.merge(data);
                $scope.grabs = $scope.grabs.concat(data);
            }
        }).catch(function(){
            ToolService.alert("数据加载失败，请稍后再试!");
        }).finally(function(){
            $rootScope.loading = false;
        })
    }

    // 加载下一页数据
    $scope.loadNext = function(){
        $scope.queryParams.currentPage++;
        $scope.loadData();
    }

    // 处理数据
    $scope.merge = function(items){
        items.forEach(function(item){
            if(item.amount==0|item.amount==null){
                item.noamount = true;
                item.btnMess = "抢光了";
            }else{
                item.noamount = false;
                item.btnMess = "立即抢";
            }
        })
    }

    // 抢单按钮
    $scope.writeCode = function(noamount,productId,hospitalId){
        if(noamount){
            return
        }else{
            if(ToolService.checkLogin()){
                if(ToolService.isUserInfoComplete()){
                    ToolService.loadUserinfo();
                    if(ToolService.userInfo.giftCode==null||ToolService.userInfo.giftCode==0){
                        ToolService.alert("一个用户只能享受一次免费项目，您已经抢过了!");
                    }else{
                        if(ToolService.getLocal("share")){
                            ToolService.changeRoute("/grab/code","productId="+productId+"&hospitalId="+hospitalId+"&dayDate="+$scope.queryParams.dayDate);
                        }else{
                            Weixin.wxShare($scope.shareObj);
                            $scope.switchTip("open");
                        }
                    }
                }else{
                    ToolService.comfirm("请完善个人信息!",function(){
                        $rootScope.hasTip = false;
                        ToolService.changeRoute("/user");
                    })
                }

            }else{
                ToolService.comfirm("请先登录并完善个人信息!",function(){
                    $rootScope.hasTip = false;
                    ToolService.changeRoute("/login");
                })
            }
        }
    }

    // 问题按钮
    $scope.question = function(){
        ToolService.alert("每个用户只可享受一次免费抢单，如需帮助请致电：0755-26905699");
    }

    // 切换tip窗口
    $scope.switchTip = function(params){
        if(params==="close"){
            $scope.showTip = false;
        }
        if(params==="open"){
            $scope.showTip = true;
        }
    }

    // 页面初始化
    ToolService.reset();
    $scope.getQueryParams();
    $scope.loadDate($scope.loadData);
    Weixin.wxInit($scope);
    Weixin.wxConfig($scope);

}

export = grab;