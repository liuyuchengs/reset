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
    $scope.exit = () => {
        ToolService.clearLocal();
        ToolService.changeRoute("/user");
    };
    //跳转到修改账户信息页面
    $scope.change = (item) => {
        let state;
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
    let queryUserInfo = () => {
        AjaxService.post({
            url: ToolService.host + "/wx/mycount/getUserByToken",
            data: { "accessToken": ToolService.user.accessToken },
            headers: {
                accessToken: ToolService.user.accessToken
            }
        }).then((data) => {
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
    };
    //初始化页面
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = true;
    if (ToolService.checkLogin()) {
        ToolService.loadUser();
        queryUserInfo();
    }
    else {
        ToolService.changeRoute("/user");
    }
}
module.exports = userinfo;
//# sourceMappingURL=userinfo.js.map