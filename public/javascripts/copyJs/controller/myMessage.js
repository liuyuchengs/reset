/**
 * 外层控制器
 */
define(function(){
    return function($scope,$rootScope,$location,Tool,Ajax){
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
        $scope.noProduct = false;
        $scope.noProductText = "";
        // 初始化页面
        $scope.init = function(){
            $rootScope.hasBgColor = false;
            if(Tool.checkLogin()){
                Tool.loadUserinfo();
                $scope.getQuery();
            }else{
                Tool.changeRoute("/user");
            }
        }

        //获取参数
        $scope.getQuery = function(){
            if($location.search().item){
                $scope.item = $location.search().item;
                $scope.switch($scope.item);
            }
        }

        // 切换导航条
        $scope.switch = function(item){
            for(var proto in $scope.params){
                if(proto==item){
                    $scope.params[proto] = true;
                }else{
                    $scope.params[proto] = false;
                }
            }
            $scope.clearData();
            if(item==="user"){
                $scope.loadNext = function(){
                    $scope.queryParams.currentPage++;
                    $scope.queryUserMessage();
                }
                $scope.queryUserMessage();
            }
            if(item==="doctor"){
                $scope.loadNext = function(){
                    $scope.queryParams.currentPage++;
                    $scope.queryDoctorMessage();
                }
                $scope.queryDoctorMessage();
            }
        }

        //清空数据
		$scope.clearData = function(){
			$scope.messages = [];
            $scope.noProduct = false;
			$scope.queryParams.currentPage = 1;
		}

        // 查询用户消息
        $scope.queryUserMessage = function(){
            Ajax.post({
                url:Tool.host+"/wx/repliesMessage/myMessage",
                params:$scope.queryParams,
                headers:{
                    accessToken:Tool.userInfo.accessToken
                }
            }).then(function(data){
                if(data.code==0){
                    if(data.data.length<1){
                        if($scope.messages.length<1){
                            $scope.noProductText = "您还没有消息!";
                        }else{
                            $scope.noProductText = "已经没有了!";
                        }
                        $scope.noProduct = true;
                    }else{
                        $scope.messages = $scope.messages.concat(data.data);
                    }
                }else{
                    Tool.alert("获取消息失败，请稍后再试!");
                }
            }).catch(function(){
                Tool.alert("获取消息失败，请稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        // 查询医生消息
        $scope.queryDoctorMessage = function(){
            var obj = {
                pageRows:10,
                currentPage:$scope.queryParams.currentPage,
                accessToken:Tool.userInfo.accessToken,
            }
            Ajax.post({
                url:Tool.host+"/wx/post/doctorMessage",
                params:obj,
                headers:{
                    'accessToken':Tool.userInfo.accessToken,
                }
            }).then(function(data){
                if(data.code==0){
                    if(data.data.length<1){
                        if($scope.messages.length<1){
                            $scope.noProductText = "您还没有消息!";
                        }else{
                            $scope.noProductText = "已经没有了!";
                        }
                        $scope.noProduct = true;
                    }else{
                        $scope.mergeMessage(data.data);
                        $scope.messages = $scope.messages.concat(data.data);
                    }
                }else{
                    Tool.alert("获取消息失败，请稍后再试!");
                }
            }).catch(function(){
                Tool.alert("获取消息失败，请稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        // 检查消息数据
        $scope.mergeMessage = function(items){
            items.forEach(function(item){
                item.dataStr = item.createTimeStr.slice(5,10);
                item.postIntro = "："+item.postIntro;
                if(item.postState==1){
                    item.noReply = false;
                }else{
                    item.noReply = true;
                }
            })
        }

        // 滚动监听
        window.onscroll = function(){
            if($rootScope.loading||$scope.noProduct){
                return;
            }
            var body = document.body;
            var html = document.documentElement;
            var height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight );
            if(height>window.innerHeight){
                if (height - window.scrollY - window.innerHeight < 100) {
                    $scope.loadNext();
                }
            }
        }

        // 跳转到帖子页面
        $scope.detail = function(id){
            Tool.changeRoute("/interaction/detail","id="+id);
        }

        //跳转到医生详情
        $scope.doctorDetail = function(id){
            Tool.changeRoute("/doctor/detail","id="+id);
        }
        }
})