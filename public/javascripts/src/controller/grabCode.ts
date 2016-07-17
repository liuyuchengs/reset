import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");

function grabCode($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax){
    $scope.queryParams = {
        productId:"",
        hospitalId:"",
        dayDate:"",
        code:"",
    }
    $scope.userInfo = {};

    // 获取查询字符串参数
    let loadQueryParams = ()=>{
        if($location.search().productId){
            $scope.queryParams.productId = $location.search().productId;
        }
        if($location.search().hospitalId){
            $scope.queryParams.hospitalId = $location.search().hospitalId;
        }
        if($location.search().dayDate){
            $scope.queryParams.dayDate = $location.search().dayDate;
        }
    }

    // 检查可生成惠赠订单
    $scope.checkCode = function(){
        if($scope.queryParams.code.length<1){
            ToolService.alert("请填写惠赠码!");
        }else if($scope.queryParams.code.length!=5){
            ToolService.alert("惠赠码错误，请填写正确的惠赠码！如需帮助请致电：0755-26905699")
        }else if($scope.queryParams.code.length ==5){
            AjaxService.post({
                url:ToolService.host+"/wx/order/checkCode",
                data:$scope.queryParams,
                headers:{
                    "accessToken":ToolService.user.accessToken,
                }
            }).then((data)=>{
                if(data.code==0){
                    getGift($scope.queryParams);
                }else{
                    ToolService.alert(data.message);
                }
            })
        }
    }

    // 生成惠赠订单
    let getGift = (queryParams:any)=>{
        AjaxService.post({
            url:ToolService.host+"/wx/gift/getgiftproduct",
            data:queryParams,
            headers:{
                "accessToken":ToolService.user.accessToken,
            }
        }).then(function(data){
            if(data.code ==0){
                var user = ToolService.getLocal("user");
                user.giftCode = 0;
                ToolService.setLocal("user",user);
                ToolService.setLocal("gift",data.data);
                ToolService.changeRoute("/grab/order");
            }
        })
    }

    // 页面初始化
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = true;
    loadQueryParams();
    if(ToolService.checkLogin()){
        ToolService.loadUser();
    }
}

export = grabCode;