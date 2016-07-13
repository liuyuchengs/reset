define(["require", "exports"], function (require, exports) {
    "use strict";
    function userinfo($scope, $rootScope, ToolService, AjaxService) {
        //用户信息
        $scope.phone;
        $scope.realname;
        $scope.sex;
        $scope.age;
        $scope.nickname;
        $scope.email;
        //退出登录
        $scope.exit = function () {
            ToolService.clearLocal();
            ToolService.changeRoute("/user");
        };
        //跳转到修改账户信息页面
        $scope.change = function (item) {
            var state;
            if (item === "wxpay") {
                if (ToolService.user.wxpay === null || ToolService.user.wxpay === "") {
                    state = 2;
                }
                else {
                    state = 1;
                }
                ToolService.changeRoute("/user/userinfochange", "item=" + item + "&state=" + state);
            }
            else if (item === "alipay") {
                if (ToolService.user.alipay === null || ToolService.user.alipay === "") {
                    state = 2;
                }
                else {
                    state = 1;
                }
                ToolService.changeRoute("/user/userinfochange", "item=" + item + "&state=" + state);
            }
            else {
                ToolService.changeRoute("/user/userinfochange", "item=" + item);
            }
        };
        //初始化页面
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
        if (ToolService.checkLogin()) {
            ToolService.loadUser();
            AjaxService.post({
                url: ToolService.host + "/wx/mycount/getUserByToken",
                data: null,
                headers: {
                    accessToken: ToolService.user.accessToken
                }
            }).then(function (data) {
                ToolService.setLocal("user", data.data);
                var user = data.data;
                $scope.phone = user.phone || "";
                $scope.realname = user.realname || "";
                $scope.sex = user.sex || "";
                $scope.age = user.age || "";
                $scope.nickname = user.nickname || "";
                $scope.email = "";
                $scope.face = user.face;
                $scope.wxpay = user.wxpay;
                $scope.alipay = user.alipay;
            });
        }
        else {
            ToolService.changeRoute("/user");
        }
    }
    return userinfo;
});
