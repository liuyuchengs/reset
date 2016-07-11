import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");

function cush($scope:any,$rootScope:IRootScope.rootScope,ToolService:Tool,AjaxService:Ajax){
    $scope.cushs = null;
    $scope.noCush = false;
    $scope.activeValue="";

    let loadCush = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/order/findAllVouchers",
            data:{userId:ToolService.user.id},
            headers:{
                accessToken:ToolService.user.accessToken
            }
        }).then((data)=>{
            if(data.code==0){
                if(data.data.length==0){
                    $scope.noCush = true;
                }else{
                    merge(data.data);
                    $scope.cushs = data.data;
                }
            }else{
                ToolService.alert("数据加载失败，请稍后再试!");
            }
        })
    }

    // 判断代金券是否有使用
    let merge = function(items:any[]){
        items.forEach((item:any)=>{
            if(item.flags>item.money){
                item.used = true;
            }else{
                item.uesd = false;
            }
        })
    }

    // 激活代金券
	$scope.active = ()=>{
        if($scope.activeValue.length==6){
            AjaxService.post({
                url:ToolService.host+"/wx/order/activate",
                data:{userId:ToolService.user.id,code:$scope.activeValue},
                headers:{
                    accessToken:ToolService.user.accessToken
                }
            }).then((data)=>{
                if(data.code==0){
                    merge(data.data);
                    $scope.cushs = data.data;
                }else{
                    ToolService.alert("代金券不正确!");
                }
            })
        }else{
            ToolService.alert("请输入正确长度的代金券!");
        }
    }

    //页面初始化
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = true;
    if(ToolService.checkLogin()){
        ToolService.loadUser();
        loadCush();
    }else{
        ToolService.changeRoute("/user");
    }
}

export = cush;