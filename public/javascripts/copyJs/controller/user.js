define(function(){
    return function($scope,$rootScope,$location,Tool,Ajax){
        $scope.user = {};
        $scope.isLogin = false;

        //页面初始化
        $scope.init = function(){
            $rootScope.hasBgColor = true;
            Tool.noWindowListen();
            $scope.initText();
            if(Tool.checkLogin()){
                Tool.loadUserinfo();
                $scope.queryFocus();
            }
        }

        //切换用户名称的显示
        $scope.initText = function(){
            if(Tool.checkLogin()){
                Tool.loadUserinfo();
                $scope.user = Tool.userInfo;
                $scope.isLogin = true;
                if($scope.user.nickname===""||$scope.user.nickname===null){
                    $scope.user.nickname = "您还没有填写昵称";
                }
            }else{
                $scope.user.face = "../contents/img/men-head.png";
                $scope.user.tip = "点击登录注册";
            }
        }

        // 未开放项目的提示
        $scope.alert = function(mess){
            Tool.alert(mess);
        }

        //获取关注数量和粉丝数量
        $scope.queryFocus = function(){
            Ajax.post({
                url:Tool.host+"/wx/focus/focusManCount",
                params: {"accessToken":Tool.userInfo.accessToken},
            }).then(function(data){
                 if(data.code==0){
                    if(data.data.countFocusMan===null||data.data.countFocusMan===""){
                        data.data.countFocusMan = 0;
                    }
                    if(data.data.countFansMan===null||data.data.countFansMan ===""){
                        data.data.countFansMan =0;
                    }
                    $scope.countFocusMan = data.data.countFocusMan;
                    $scope.countFansMan = data.data.countFansMan;
                }
            }).catch(function(){
                $scope.countFocusMan = 0;
                $scope.countFansMan = 0;
                Tool.alert("获取粉丝信息失败!");
            }).finally(function(){
				$rootScope.loading = false;
			})
        }
        
        //跳转到选项页面
        $scope.goto = function(path,query){
            if(Tool.checkLogin()){
                Tool.changeRoute(path,query);
            }else{
                Tool.changeRoute("/login","");
            }
        };
    }
})