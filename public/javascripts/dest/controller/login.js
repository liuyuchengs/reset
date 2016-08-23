define(["require", "exports"], function (require, exports) {
    "use strict";
    function login($scope, $rootScope, $location, AjaxService, ToolService) {
        $scope.phone = "";
        $scope.password = "";
        // 登录
        $scope.login = () => {
            if (check()) {
                AjaxService.post({
                    url: ToolService.host + "/wx/login/wxlogin",
                    data: { phone: $scope.phone, password: $scope.password },
                }).then((data) => {
                    if (data.code == 0) {
                        ToolService.setLocal("user", data.data);
                        $location.path("/user");
                    }
                    else if (data.code == 1) {
                        ToolService.alert("账号或者密码错误,请重新输入");
                    }
                    else {
                        ToolService.alert("未知错误!");
                    }
                });
            }
            else {
                ToolService.alert("请检查手机号码或者密码长度符合要求！");
            }
        };
        // 检查信息是否符合要求
        let check = () => {
            if (/^1[3-8]\d{9}$/.test($scope.phone) && $scope.password.length >= 8 && $scope.password.length <= 20) {
                return true;
            }
            else {
                return false;
            }
        };
        //初始化页面
        ToolService.reset();
    }
    return login;
});
//# sourceMappingURL=login.js.map