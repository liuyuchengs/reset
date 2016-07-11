import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");

function grabOrder($scope:any,$rootScope:IRootScope.rootScope,ToolService:Tool,AjaxService:Ajax){
    $scope.hasGift = false;
    $scope.gift = {};

    // 查询惠赠订单
    let queryGift = ()=>{
        AjaxService.get({
            url:ToolService.host+"/wx/order/queryUserGiftCode",
            headers:{
                accessToken:ToolService.user.accessToken,
            }
        }).then((data)=>{
            if(data.code==0){
                if(data.data.length>0){
                    $scope.gift = data.data[0];
                    $scope.hasGift = true;
                }
            }
        })
    }

    // 初始化页面
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = true;
    if(ToolService.checkLogin()){
        ToolService.loadUser();
        queryGift();
    }else{
        ToolService.changeRoute("/user");
    }
}

export = grabOrder;