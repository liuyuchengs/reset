define(["require", "exports"], function (require, exports) {
    "use strict";
    function myFollow($scope, $rootScope, $location, ToolService, AjaxService) {
        //导航条变量
        $scope.params = {
            doctor: false,
            user: true,
            product: false
        };
        $scope.queryParams = {
            pageRows: 10,
            currentPage: 1,
            flag: 1,
        };
        $scope.follows = [];
        //获取查询参数
        let getQuery = () => {
            if ($location.search().item) {
                $scope.switch($location.search().item);
            }
            else {
                ToolService.changeRoute("/user");
            }
        };
        //切换导航条
        $scope.switch = (item) => {
            for (var proto in $scope.params) {
                if (proto == item) {
                    $scope.params[proto] = true;
                }
                else {
                    $scope.params[proto] = false;
                }
            }
            clearData();
            if (item === "user") {
                setNext($scope.queryUser);
                $scope.queryUser();
            }
            if (item === "doctor") {
                setNext($scope.queryDoctor);
                $scope.queryDoctor();
            }
            if (item === "product") {
                setNext($scope.queryProduct);
                $scope.queryProduct();
            }
        };
        //清空数据
        let clearData = () => {
            $scope.follows = [];
            $rootScope.followTip.has = false;
            $scope.queryParams.currentPage = 1;
        };
        //查询关注的用户
        $scope.queryUser = () => {
            $scope.queryParams.flag = 1;
            AjaxService.post({
                url: ToolService.host + "/wx/focus/focusUserMan",
                data: $scope.queryParams,
                headers: {
                    accessToken: ToolService.user.accessToken,
                }
            }).then((data) => {
                if (data.code === 0) {
                    if (data.data.length < 1) {
                        if ($scope.follows.length < 1) {
                            $rootScope.followTip.val = $rootScope.followTip.empty;
                        }
                        else {
                            $rootScope.followTip.val = $rootScope.followTip.no;
                        }
                        $rootScope.followTip.has = true;
                    }
                    else {
                        data.data.forEach((item) => {
                            item.hasFollow = true;
                            item.followText = "已关注";
                        });
                        $scope.follows = $scope.follows.concat(data.data);
                    }
                }
                else {
                    ToolService.alert("数据连接失败，请稍后再试!");
                }
            });
        };
        //查询关注的医生
        $scope.queryDoctor = () => {
            $scope.queryParams.flag = 2;
            AjaxService.post({
                url: ToolService.host + "/wx/focus/focusDoctorMan",
                data: $scope.queryParams,
                headers: {
                    accessToken: ToolService.user.accessToken,
                }
            }).then((data) => {
                if (data.code === 0) {
                    if (data.data.length < 1) {
                        if ($scope.follows.length < 1) {
                            $rootScope.followTip.val = $rootScope.followTip.empty;
                        }
                        else {
                            $rootScope.followTip.val = $rootScope.followTip.no;
                        }
                        $rootScope.followTip.has = true;
                    }
                    else {
                        data.data.forEach((item) => {
                            item.hasFollow = true;
                            item.followText = "已关注";
                        });
                        $scope.follows = $scope.follows.concat(data.data);
                    }
                }
                else {
                    ToolService.alert("数据连接失败，请稍后再试!");
                }
            });
        };
        //查询关注的项目
        $scope.queryProduct = () => {
            $scope.queryParams.flag = 3;
            AjaxService.post({
                url: ToolService.host + "/wx/focus/focusProductMan",
                data: $scope.queryParams,
                headers: {
                    accessToken: ToolService.user.accessToken,
                }
            }).then((data) => {
                if (data.code === 0) {
                    if (data.data.length < 1) {
                        if ($scope.follows.length < 1) {
                            $rootScope.followTip.val = $rootScope.followTip.empty;
                        }
                        else {
                            $rootScope.followTip.val = $rootScope.followTip.no;
                        }
                        $rootScope.followTip.has = true;
                    }
                    else {
                        data.data.forEach((item) => {
                            item.hasFollow = true;
                            item.followText = "已关注";
                        });
                        $scope.follows = $scope.follows.concat(data.data);
                    }
                }
                else {
                    ToolService.alert("数据连接失败，请稍后再试!");
                }
            });
        };
        // 关注按钮处理函数
        $scope.switchFollow = (id, flag) => {
            if (ToolService.checkLogin()) {
                ToolService.loadUser();
                if (selectFollow(id)) {
                    var follow = selectFollow(id);
                    if (follow.hasFollow) {
                        cacelFollow(id, flag);
                    }
                    else {
                        tofollow(id, flag);
                    }
                }
            }
            else {
                ToolService.comfirm("请先登录!", function () {
                    $rootScope.followTip.has = false;
                    ToolService.changeRoute("/login");
                });
            }
        };
        // 关注用户
        let tofollow = (id, flag) => {
            AjaxService.post({
                url: ToolService.host + "/wx/post/focus",
                data: { flag: flag, userId: id },
                headers: {
                    accessToken: ToolService.user.accessToken,
                }
            }).then((data) => {
                if (data.code == 0) {
                    if (selectFollow(id)) {
                        var follow = selectFollow(id);
                        follow.hasFollow = true;
                        follow.followText = "已关注";
                    }
                }
                else {
                    ToolService.alert("关注失败，稍后再试!");
                }
            });
        };
        // 取消关注用户
        let cacelFollow = (id, flag) => {
            AjaxService.post({
                url: ToolService.host + "/wx/post/cacelFocus",
                data: { flag: flag, userId: id },
                headers: {
                    accessToken: ToolService.user.accessToken,
                }
            }).then((data) => {
                if (data.code == 0) {
                    if (selectFollow(id)) {
                        var follow = selectFollow(id);
                        follow.hasFollow = false;
                        follow.followText = "关注";
                    }
                }
                else {
                    ToolService.alert("取消关注失败，稍后再试!");
                }
            });
        };
        //定位具体的关注元素
        let selectFollow = (id) => {
            for (var proto in $scope.follows) {
                var follow = $scope.follows[proto];
                if (follow.id == id) {
                    return follow;
                }
            }
        };
        //设置加载下一页的方法
        let setNext = (fn) => {
            ToolService.onWindowListen(() => {
                $scope.queryParams.currentPage++;
                fn();
            });
        };
        //初始化页面
        ToolService.reset();
        if (ToolService.checkLogin()) {
            ToolService.loadUser();
            getQuery();
        }
        else {
            ToolService.changeRoute("/user");
        }
    }
    return myFollow;
});
//# sourceMappingURL=myFollow.js.map