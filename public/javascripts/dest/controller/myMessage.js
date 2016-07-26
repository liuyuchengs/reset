define(["require", "exports"], function (require, exports) {
    "use strict";
    function myMessage($scope, $rootScope, $location, ToolService, AjaxService) {
        // 导航条参数
        $scope.params = {
            user: false,
            doctor: false,
            system: false
        };
        $scope.queryParams = {
            pageRows: 10,
            currentPage: 1
        };
        $scope.item = "";
        $scope.messages = [];
        //获取参数
        var getQuery = function () {
            if ($location.search().item) {
                $scope.item = $location.search().item;
                $scope.switch($scope.item);
            }
        };
        // 切换导航条
        $scope.switch = function (item) {
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
                ToolService.onWindowListen(function () {
                    $scope.queryParams.currentPage++;
                    queryUserMessage();
                });
                queryUserMessage();
            }
            if (item === "doctor") {
                ToolService.onWindowListen(function () {
                    $scope.queryParams.currentPage++;
                    queryDoctorMessage();
                });
                queryDoctorMessage();
            }
        };
        //清空数据
        var clearData = function () {
            $scope.messages = [];
            $rootScope.followTip.has = false;
            $scope.queryParams.currentPage = 1;
        };
        // 查询用户消息
        var queryUserMessage = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/repliesMessage/myMessage",
                data: $scope.queryParams,
                headers: {
                    accessToken: ToolService.user.accessToken
                }
            }).then(function (data) {
                if (data.code == 0) {
                    if (data.data.length < 1) {
                        if ($scope.messages.length < 1) {
                            $rootScope.followTip.val = $rootScope.followTip.empty;
                        }
                        else {
                            $rootScope.followTip.val = $rootScope.followTip.no;
                        }
                        $rootScope.followTip.has = true;
                    }
                    else {
                        $scope.messages = $scope.messages.concat(data.data);
                    }
                }
                else {
                    ToolService.alert("获取消息失败，请稍后再试!");
                }
            });
        };
        // 查询医生消息
        var queryDoctorMessage = function () {
            var obj = {
                pageRows: 10,
                currentPage: $scope.queryParams.currentPage,
                accessToken: ToolService.user.accessToken,
            };
            AjaxService.post({
                url: ToolService.host + "/wx/post/doctorMessage",
                data: obj,
                headers: {
                    accessToken: ToolService.user.accessToken,
                }
            }).then(function (data) {
                if (data.code == 0) {
                    if (data.data.length < 1) {
                        if ($scope.messages.length < 1) {
                            $rootScope.followTip.val = $rootScope.followTip.empty;
                        }
                        else {
                            $rootScope.followTip.val = $rootScope.followTip.no;
                        }
                        $rootScope.followTip.has = true;
                    }
                    else {
                        mergeMessage(data.data);
                        $scope.messages = $scope.messages.concat(data.data);
                    }
                }
                else {
                    ToolService.alert("获取消息失败，请稍后再试!");
                }
            });
        };
        // 检查消息数据
        var mergeMessage = function (items) {
            items.forEach(function (item) {
                item.dataStr = item.createTimeStr.slice(5, 10);
                item.postIntro = "：" + item.postIntro;
                if (item.postState == 1) {
                    item.noReply = false;
                }
                else {
                    item.noReply = true;
                }
            });
        };
        // 跳转到帖子页面
        $scope.detail = function (id) {
            ToolService.changeRoute("/interaction/detail", "id=" + id);
        };
        //跳转到医生详情
        $scope.doctorDetail = function (id) {
            ToolService.changeRoute("/doctor/detail", "id=" + id);
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
    return myMessage;
});
//# sourceMappingURL=myMessage.js.map