define(["require", "exports"], function (require, exports) {
    "use strict";
    function invite($scope, $rootScope, $location, ToolService, AjaxService, WeixinService) {
        //定义样式
        $scope.bgStyle = {
            "width": window.screen.width,
            "height": (window.screen.width / 320) * 145,
        };
        $scope.bodyStyle = {
            "width": window.screen.width,
            "min-height": window.screen.height - 50,
        };
        $scope.shareObj = {
            title: "悠康医生邀请好友即送现金啦",
            desc: "悠康医生邀请好友即可获得现金和代金券，快来看看吧!",
            link: "https://www.uokang.com/v2/htmls/index.html#/invite/register",
            imgUrl: "https://www.uokang.com/new/contents/img/logo.png",
            success: function () {
                $scope.showTip = false;
                ToolService.alert("分享成功!");
            },
            cancel: function () { },
            ready: false,
        };
        $scope.code = "";
        $scope.showTip = false;
        //邀请好友初始化
        var inviteInit = function () {
            if ($location.search().at) {
                var accessToken = $location.search().at;
                queryCode(accessToken);
            }
            else {
                if (ToolService.checkLogin()) {
                    ToolService.loadUser();
                    queryCode(ToolService.user.accessToken);
                    //$scope.queryShare();
                    WeixinService.wxInit();
                    WeixinService.wxConfig();
                }
                else {
                    ToolService.alert("请先登录", function () {
                        $rootScope.messageTip.has = false;
                        ToolService.changeRoute("/user");
                    });
                }
            }
        };
        // 查询用户的邀请码
        var queryCode = function (accessToken) {
            AjaxService.post({
                url: ToolService.host + "/wx/user/createReferralCode",
                data: { "accessToken": accessToken },
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.code = data.data.referralCode;
                    $scope.shareObj.link = $scope.shareObj.link + "?code=" + $scope.code + "&name=" + ToolService.user.nickname;
                    $scope.shareObj.ready = true;
                }
                else {
                    ToolService.alert("查询邀请码错误!");
                }
            });
        };
        // 查询分享内容
        var queryShare = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/share/queryById",
                data: { id: 98 }
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.shareObj.title = data.data.title;
                    $scope.shareObj.desc = data.data.content;
                    $scope.shareObj.link = data.data.url + "?code=" + $scope.code + "&name=" + ToolService.user.nickname;
                    $scope.shareObj.imgUrl = data.data.image;
                    $scope.shareObj.ready = true;
                }
                else {
                    ToolService.alert("获取分享内容失败，请稍后再试！");
                    $scope.shareObj.ready = false;
                }
            });
        };
        //切换提示框
        $scope.switchTip = function (item) {
            if (item === "close") {
                $scope.showTip = false;
            }
            if (item === "open") {
                $scope.showTip = true;
            }
        };
        //分享邀请按钮
        $scope.share = function () {
            if ($scope.shareObj.ready) {
                $scope.switchTip("open");
                WeixinService.wxShare($scope.shareObj);
            }
            else {
                ToolService.alert("获取分享内容失败，请稍后再试！");
            }
        };
        //新用户注册初始化
        var registerInit = function () {
            if ($location.search().code) {
                $scope.code = $location.search().code;
                $scope.name = $location.search().name;
            }
            else {
                ToolService.alert("请检查链接是否完整", function () {
                    $rootScope.messageTip.has = false;
                    ToolService.changeRoute("/home");
                });
            }
        };
        //跳转注册
        $scope.goRegister = function () {
            ToolService.changeRoute("/register", "code=" + $scope.code);
        };
        //页面初始化
        ToolService.reset();
        if ($location.path()) {
            var path = $location.path();
            if (path === "/invite/new") {
                inviteInit();
            }
            else if (path === "/invite/register") {
                registerInit();
            }
        }
        else {
            ToolService.changeRoute("/home");
        }
    }
    return invite;
});
//# sourceMappingURL=invite.js.map