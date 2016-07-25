define(["require", "exports"], function (require, exports) {
    "use strict";
    function findpass($scope, $rootScope, $location, $interval, ToolService, AjaxService) {
        $scope.phone = ""; //手机号码
        $scope.code = ""; //验证码
        $scope.pwd = ""; //密码
        $scope.getPhone = $location.search().phone || ""; //跳转页面缓存手机号码
        $scope.getCodes = $location.search().code || ""; //跳转页面缓存验证码
        $scope.hasSendCode = false; //是否是发送验证码状态
        $scope.codeText = "获取短信验证码";
        $scope.sendCodes = false;
        // 检测手机号码是否有注册
        $scope.checkPhone = function () {
            if (/^1[3|4|5|7|8]\d{9}$/.test($scope.phone)) {
                AjaxService.post({
                    url: ToolService.host + "/wx/findpass/findPassPhontCheck",
                    data: { name: "phone", param: $scope.phone }
                }).then(function (data) {
                    if (data.code == 0) {
                        ToolService.changeRoute("/findpwd/code", "phone=" + $scope.phone);
                    }
                    else {
                        ToolService.alert(data.message);
                    }
                });
            }
            else {
                ToolService.alert("请输入正确的手机号码!");
            }
        };
        // 检测验证码是否正确
        $scope.checkCode = function () {
            if ($scope.sendCodes) {
                if ($scope.code.length == 4) {
                    AjaxService.post({
                        url: ToolService.host + "/wx/findpass/findPassPhontCheck",
                        data: { name: "verifyCode", param: $scope.code, p: $scope.getPhone },
                    }).then(function (data) {
                        if (data.code == 0) {
                            ToolService.changeRoute("/findpwd/pwd", "phone=" + $scope.getPhone + "&code=" + $scope.code);
                        }
                        else {
                            ToolService.alert(data.message);
                        }
                    });
                }
                else {
                    ToolService.alert("请输入4位验证码");
                }
            }
            else {
                ToolService.alert("请先获取验证码");
            }
        };
        // 修改密码
        $scope.changePwd = function () {
            if ($scope.pwd.length >= 8 && $scope.pwd.length <= 20) {
                AjaxService.post({
                    url: ToolService.host + "/wx/findpass/changepwd",
                    data: { phone: $scope.getPhone, code: $scope.getCodes, password: $scope.pwd }
                }).then(function (data) {
                    if (data.code == 0) {
                        ToolService.alert("密码修改成功!", function () {
                            $rootScope.followTip.has = false;
                            ToolService.changeRoute("/login");
                        });
                    }
                    else {
                        ToolService.alert(data.message);
                    }
                });
            }
        };
        // 发送短信验证码
        $scope.getCode = function () {
            if (!$scope.hasSendCode) {
                AjaxService.post({
                    url: ToolService.host + "/wx/findpass/sendsmsfindpasscode",
                    data: { phone: $scope.getPhone },
                }).then(function (data) {
                    if (data.code == 0) {
                        $scope.hasSendCode = true;
                        $scope.sendCodes = true;
                        var time = 59;
                        var interval = $interval(function () {
                            $scope.codeText = (time + " S");
                            time--;
                        }, 1000, 60).then(function () {
                            $scope.codeText = "获取短信验证码";
                            $scope.hasSendCode = false;
                            $interval.cancel(interval);
                        });
                    }
                    else {
                        ToolService.alert(data.mesage);
                    }
                });
            }
        };
        // 初始化页面
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
    }
    return findpass;
});
//# sourceMappingURL=findpass.js.map