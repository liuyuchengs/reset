define(function(){
    return function($scope,$rootScope,$location,Tool,Ajax){
        //导航条变量
        $scope.params = {
            doctor:false,
            user:true,
            product:false
        }

        $scope.queryParams = {
            pageRows:10,
            currentPage:1,
            flag:1,
        }

        $scope.follows = [];
        $scope.noProduct = false;
        $scope.noProductText = "";

        //页面初始化
        $scope.init = function(){
            $rootScope.hasBgColor = false;
            if(Tool.checkLogin()){
                Tool.loadUserinfo();
                $scope.getQuery();
            }else{
                Tool.changeRoute("/user");
            }
        }

        //获取查询参数
        $scope.getQuery = function(){
            if($location.search().item){
                $scope.switch($location.search().item);
            }else{
                Tool.changeRoute("/user");
            }
        }

        //切换导航条
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
                $scope.setNext($scope.queryUser);
                $scope.queryUser();
            }
            if(item==="doctor"){
                $scope.setNext($scope.queryDoctor);
                $scope.queryDoctor();
            }
            if(item==="product"){
                $scope.setNext($scope.queryProduct);
                $scope.queryProduct();
            }
        }

        //清空数据
        $scope.clearData = function(){
            $scope.follows = [];
            $scope.noProduct = false;
            $scope.noProductText = "";
            $scope.queryParams.currentPage = 1;
        }

        //查询关注的用户
        $scope.queryUser = function(){
            $scope.queryParams.flag = 1;
            Ajax.post({
                url:Tool.host+"/wx/focus/focusUserMan",
                params:$scope.queryParams,
                headers:{
                    'accessToken':Tool.userInfo.accessToken,
                }
            }).then(function(data){
                if(data.code===0){
                    if(data.data.length<1){
                        if($scope.follows.length<1){
                            $scope.noProductText = "您还没有关注其他人!";
                        }else{
                            $scope.noProductText = "已经没有了!";
                        }
                        $scope.noProduct = true;
                    }else{
                        data.data.forEach(function(item){
                            item.hasFollow = true;
                            item.followText = "已关注";
                        });
                        $scope.follows = $scope.follows.concat(data.data);
                    }
                }else{
                    Tool.alert("数据连接失败，请稍后再试!");
                }
            }).catch(function(){
                Tool.alert("数据连接失败，请稍后再试!");
            }).finally(function(){
                $rootScope.loading =false;
            })
        }

        //查询关注的医生
        $scope.queryDoctor = function(){
            $scope.queryParams.flag = 2;
            Ajax.post({
                url:Tool.host+"/wx/focus/focusDoctorMan",
                params:$scope.queryParams,
                headers:{
                    'accessToken':Tool.userInfo.accessToken,
                }
            }).then(function(data){
                if(data.code===0){
                    if(data.data.length<1){
                        if($scope.follows.length<1){
                            $scope.noProductText = "您还没有关注医生!";
                        }else{
                            $scope.noProductText = "已经没有了!";
                        }
                        $scope.noProduct = true;
                    }else{
                        data.data.forEach(function(item){
                            item.hasFollow = true;
                            item.followText = "已关注";
                        })
                        $scope.follows = $scope.follows.concat(data.data);
                    }
                }else{
                    Tool.alert("数据连接失败，请稍后再试!");
                }
            }).catch(function(){
                Tool.alert("连接数据失败,请稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        //查询关注的项目
        $scope.queryProduct = function(){
            $scope.queryParams.flag = 3;
            Ajax.post({
                url:Tool.host+"/wx/focus/focusProductMan",
                params:$scope.queryParams,
                headers:{
                    'accessToken':Tool.userInfo.accessToken,
                }
            }).then(function(data){
                if(data.code===0){
                    if(data.data.length<1){
                        if($scope.follows.length<1){
                            $scope.noProductText = "您还没有关注项目!";
                        }else{
                            $scope.noProductText = "已经没有了!";
                        }
                        $scope.noProduct = true;
                    }else{
                        data.data.forEach(function(item){
                            item.hasFollow = true;
                            item.followText = "已关注";
                        });
                        $scope.follows = $scope.follows.concat(data.data);
                    }
                }else{
                    Tool.alert("数据连接失败，请稍后再试!");
                }
            }).catch(function(){
                Tool.alert("连接数据失败,请稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        // 关注按钮处理函数
        $scope.switchFollow = function(id,flag){
            if(Tool.checkLogin()){
                Tool.loadUserinfo();
                if($scope.selectFollow(id)){
                    var follow = $scope.selectFollow(id);
                    if(follow.hasFollow){
                        $scope.cacelFollow(id,flag);
                    }else{
                        $scope.tofollow(id,flag);
                    }
                }
            }else{
                Tool.comfirm("请先登录!",function(){
                    $rootScope.loading = false;
                    Tool.changeRoute("/login");
                })
            }
        }

        // 关注用户
        $scope.tofollow = function(id,flag){
            Ajax.post({
                url:Tool.host+"/wx/post/focus",
                params:{flag:flag,userId:id},
                headers:{
                    'accessToken':Tool.userInfo.accessToken,
                }
            }).then(function(data){
                if(data.code==0){
                    if($scope.selectFollow(id)){
                        var follow = $scope.selectFollow(id);
                        follow.hasFollow = true;
                        follow.followText = "已关注";
                    }
                }else{
                    Tool.alert("关注失败，稍后再试!");
                }
            }).catch(function(){
                Tool.alert("连接数据失败，请稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        // 取消关注用户
        $scope.cacelFollow = function(id,flag){
            Ajax.post({
                url:Tool.host+"/wx/post/cacelFocus",
                params:{flag:flag,userId:id},
                headers:{
                    'accessToken':Tool.userInfo.accessToken,
                }
            }).then(function(data){
                if(data.code==0){
                    if($scope.selectFollow(id)){
                        var follow = $scope.selectFollow(id);
                        follow.hasFollow = false;
                        follow.followText = "关注";
                    }
                }else{
                    Tool.alert("取消关注失败，稍后再试!");
                }
            }).catch(function(){
                Tool.alert("连接数据失败，稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        //定位具体的关注元素
        $scope.selectFollow = function(id){
            for(var proto in $scope.follows){
                var follow = $scope.follows[proto];
                if(follow.id == id){
                    return follow;
                }
            }
        }

        //设置加载下一页的方法
        $scope.setNext = function(fn){
            $scope.loadNext = function(){
                $scope.queryParams.currentPage++;
                fn();
            }
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
    }
})