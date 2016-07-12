import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");

function myPost($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,AjaxService:Ajax,ToolService:Tool){
    //导航条参数
    $scope.params = {
        hasPublish:false,
        hasReply:false,
    }
    $scope.queryParams = {
        pageRows:10,
        currentPage:1
    }

    $scope.item = "";
    $scope.posts = [];
    $scope.replys = [];
    $scope.user = {};

    //切换导航条
    $scope.switch = (p:string)=>{
        if(p==="publish"){
            $scope.params.hasPublish = true;
            $scope.posts = [];
            $scope.replys = [];
            $scope.queryParams.currentPage =  1;
            $rootScope.followTip.has = false;
            $scope.loadNext =function(){
                $scope.queryParams.currentPage++;
                queryPost();
            }
            queryPost();
            if($scope.params.hasReply){
                $scope.params.hasReply = false;
            }
        }
        if(p==="reply"){  
            $scope.params.hasReply = true;
            $scope.posts = [];
            $scope.replys = [];
            $scope.queryParams.currentPage =  1;
            $rootScope.followTip.has = false;
            $scope.loadNext =function(){
                $scope.queryParams.currentPage++;
                queryReply();
            }
            queryReply();
            if($scope.params.hasPublish){
                $scope.params.hasPublish = false;
            }
        }
    }

    //获取查询参数
    let getQuery = ()=>{
        if($location.search().item){
            $scope.item = $location.search().item;
            $scope.switch($scope.item);
        }else{
            ToolService.changeRoute("/uesr");
        }
    }

    // 查询我的回复
    let queryReply = function(){
        AjaxService.post({
            url:ToolService.host+"/wx/repliesMessage/myReply",
            data:$scope.queryParams,
            headers:{
                accessToken:ToolService.user.accessToken,
            }
        }).then((data)=>{
            if(data.code===0){
                if(data.data.length<1){
                    if($scope.replys.length<1){
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }else{
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }else{
                    data.data.forEach((item:any)=>{
                        item.dataStr = item.createDateStr.slice(5,10);
                    })
                    $scope.replys = $scope.replys.concat(data.data);
                }
            }else{
                ToolService.alert("获取评论信息失败!");
            }
        })
    }

    // 加载我的帖子数据
    let queryPost = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/post/myPost",
            data:$scope.queryParams,
            headers:{
                'accessToken':ToolService.user.accessToken,
            }
        }).then(function(data){
            if(data.data.length<1){
                if($scope.posts.length<1){
                    $rootScope.followTip.val = $rootScope.followTip.empty;
                }else{
                    $rootScope.followTip.val = $rootScope.followTip.no;
                }
                $rootScope.followTip.has = true;
            }else{
                data.data.forEach(function(item:any){
                    if(item.visitNum==null||item.visitNum==""){
                        item.visitNum=0;
                    }
                    if(item.commentNum==""||item.commentNum==null){
                        item.commentNum = 0;
                    }
                })
                $scope.posts = $scope.posts.concat(data.data);
            }
        })
    }

    // 跳转到帖子页面
    $scope.goPost = (id:any)=>{
        ToolService.changeRoute("/interaction/detail","id="+id);
    }

    //删除帖子
    $scope.deletePost = (id:any,$event:any)=>{
        $event.stopPropagation();
        ToolService.comfirm("确定要删除吗?",function(){
            $rootScope.messageTip.has = false;
            AjaxService.post({
                url:ToolService.host+"/wx/post/deletePost",
                data:{postId:id,accessToken:ToolService.user.accessToken},
            }).then((data)=>{
                if(data.code==0){
                    deleteObj(id,$scope.posts);
                }
            })
        })
    }

    //删除回复
    $scope.deleteReply = (postid:any,id:any)=>{
        ToolService.comfirm("确定要删除吗?",function(){
            $rootScope.messageTip.has = false;
            AjaxService.post({
                url:ToolService.host+"/wx/repliesMessage/deleteReplies",
                data:{postId:postid,repliesId:id,accessToken:ToolService.user.accessToken},
            }).then((data)=>{
                if(data.code==0){
                    $scope.switch("reply");
                }
            })
        })
    }

    //从帖子数据中删除指定帖子
    let deleteObj = (id:any,array:any)=>{
        for(var index in array){
            if(array[index].id==id){
                array.splice(index,1);
            }
        }
    }

    //初始化页面
    ToolService.reset();
    if(ToolService.checkLogin()){
        ToolService.loadUser();
        getQuery();
    }else{
        ToolService.changeRoute("/user");
    }
    ToolService.onWindowListen($scope.loadNext);
}

export = myPost