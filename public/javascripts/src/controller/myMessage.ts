import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");

function myMessage($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax){
    // 导航条参数
    $scope.params = {
        user:false,
        doctor:false,
        system:false
    }  
    $scope.queryParams = {
        pageRows:10,
        currentPage:1
    }
    $scope.item = "";
    $scope.messages = [];

    //获取参数
    let getQuery = ()=>{
        if($location.search().item){
            $scope.item = $location.search().item;
            $scope.switch($scope.item);
        }
    }

    // 切换导航条
    $scope.switch = (item:any)=>{
        for(var proto in $scope.params){
            if(proto==item){
                $scope.params[proto] = true;
            }else{
                $scope.params[proto] = false;
            }
        }
        clearData();
        if(item==="user"){
            ToolService.onWindowListen(()=>{
                $scope.queryParams.currentPage++;
                queryUserMessage();
            });
            queryUserMessage();
        }
        if(item==="doctor"){
            ToolService.onWindowListen(()=>{
                $scope.queryParams.currentPage++;
                queryDoctorMessage();
            });
            queryDoctorMessage();
        }
    }

    //清空数据
    let clearData = ()=>{
        $scope.messages = [];
        $rootScope.followTip.has = false;
        $scope.queryParams.currentPage = 1;
    }

    // 查询用户消息
    let queryUserMessage = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/repliesMessage/myMessage",
            data:$scope.queryParams,
            headers:{
                accessToken:ToolService.user.accessToken
            }
        }).then((data:any)=>{
            if(data.code==0){
                if(data.data.length<1){
                    if($scope.messages.length<1){
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }else{
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }else{
                    $scope.messages = $scope.messages.concat(data.data);
                }
            }else{
                ToolService.alert("获取消息失败，请稍后再试!");
            }
        })
    }

    // 查询医生消息
    let queryDoctorMessage = ()=>{
        var obj = {
            pageRows:10,
            currentPage:$scope.queryParams.currentPage,
            accessToken:ToolService.user.accessToken,
        }
        AjaxService.post({
            url:ToolService.host+"/wx/post/doctorMessage",
            data:obj,
            headers:{
                accessToken:ToolService.user.accessToken,
            }
        }).then((data)=>{
            if(data.code==0){
                if(data.data.length<1){
                    if($scope.messages.length<1){
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }else{
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }else{
                    mergeMessage(data.data);
                    $scope.messages = $scope.messages.concat(data.data);
                }
            }else{
                ToolService.alert("获取消息失败，请稍后再试!");
            }
        })
    }

    // 检查消息数据
    let mergeMessage = (items:any)=>{
        items.forEach((item:any)=>{
            item.dataStr = item.createTimeStr.slice(5,10);
            item.postIntro = "："+item.postIntro;
            if(item.postState==1){
                item.noReply = false;
            }else{
                item.noReply = true;
            }
        })
    }
    // 跳转到帖子页面
    $scope.detail = (id:number)=>{
        ToolService.changeRoute("/interaction/detail","id="+id);
    }

    //跳转到医生详情
    $scope.doctorDetail = (id:number)=>{
        ToolService.changeRoute("/doctor/detail","id="+id);
    }

    //初始化页面
    ToolService.reset();
    if(ToolService.checkLogin()){
        ToolService.loadUser();
        getQuery();
    }else{
        ToolService.changeRoute("/user");
    }
}

export = myMessage;