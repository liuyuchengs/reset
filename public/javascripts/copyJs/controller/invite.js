define(function(){
    return function($scope,$rootScope,$location,Tool,Ajax,Weixin){
        //定义样式
        $scope.bgStyle = {
            "width":window.screen.width,
            "height":(window.screen.width/320)*145,
        }
        $scope.bodyStyle = {
            "width":window.screen.width,
            "min-height":window.screen.height-50,
        }
        $scope.shareObj = {
			title:"悠康医生邀请好友即送现金啦",
			desc:"悠康医生邀请好友即可获得现金和代金券，快来看看吧!",
			link:"https://www.uokang.com/v2/htmls/index.html#/invite/register",
			imgUrl:"https://www.uokang.com/new/contents/img/logo.png",
			success:function(){
				$scope.showTip = false;
                Tool.alert("分享成功!");
			},
			cancel:function(){},
            ready:false,//是否配置完成
		}
        $scope.code = "";
        $scope.showTip = false;

        //邀请好友初始化
        $scope.inviteInit = function(){
            Tool.noWindowListen();
            if($location.search().at){
                var accessToken = $location.search().at;
                $scope.queryCode(accessToken);
            }else{
                if(Tool.checkLogin()){
                    Tool.loadUserinfo();
                    $scope.queryCode(Tool.userInfo.accessToken);
                    //$scope.queryShare();
                    Weixin.wxInit($scope);
                    Weixin.wxConfig($scope);
                }else{
                    Tool.alert("请先登录",function(){
                        $rootScope.hasTip = false;
                        Tool.changeRoute("/user");
                    })
                }

            }
        }

        //查询用户的邀请码
        $scope.queryCode = function(accessToken){
            Ajax.post({
                url:Tool.host+"/wx/user/createReferralCode",
                params:{"accessToken":accessToken},
            }).then(function(data){
                if(data.code==0){
                    $scope.code = data.data.referralCode;
                    $scope.shareObj.link = $scope.shareObj.link+"?code="+$scope.code+"&name="+Tool.userInfo.nickname;
                    $scope.shareObj.ready = true;
                    //$scope.queryShare();
                }else{
                    Tool.alert("查询邀请码错误!");
                }
            }).catch(function(){
                Tool.alert("查询邀请码失败!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        //查询分享内容
        $scope.queryShare = function(){
            Ajax.post({
                url:Tool.host+"/wx/share/queryById",
                params:{id:98}
            }).then(function(data){
                if(data.code==0){
                    $scope.shareObj.title= data.data.title;
                    $scope.shareObj.desc = data.data.content;
                    $scope.shareObj.link = data.data.url+"?code="+$scope.code+"&name="+Tool.userInfo.nickname;
                    $scope.shareObj.imgUrl = data.data.image;
                    $scope.shareObj.ready = true;
                }else{
                    Tool.alert("获取分享内容失败，请稍后再试！");
                    $scope.shareObj.ready = false;
                }
            }).catch(function(){
                Tool.alert("获取分享内容失败，请稍后再试！");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        //切换提示框
        $scope.switchTip = function(item){
            if(item==="close"){
                $scope.showTip = false;
            }
            if(item==="open"){
                $scope.showTip = true;
            }  
        }

        //分享邀请按钮
        $scope.share = function(){
            if($scope.shareObj.ready){
                $scope.switchTip("open");
                Weixin.wxShare($scope.shareObj);
            }else{
                Tool.alert("获取分享内容失败，请稍后再试！");
            }
        }

        //新用户注册初始化
        $scope.registerInit = function(){
            if($location.search().code){
                $scope.code = $location.search().code;
                $scope.name = $location.search().name;
            }else{
                Tool.alert("请检查链接是否完整",function(){
                    $rootScope.hasTip = false;
                    Tool.changeRoute("/home");
                })
            }
        }

        //跳转注册
        $scope.goRegister = function(){
            Tool.changeRoute("/register","code="+$scope.code);
        }

        //页面初始化
        angular.element(document).ready(function(){
            if($location.path()){
                var path = $location.path();
                if(path==="/invite/new"){
                    $scope.inviteInit();
                }else if(path==="/invite/register"){
                    $scope.registerInit();
                }
            }else{
                Tool.changeRoute("/home");
            }
        })
    }
})