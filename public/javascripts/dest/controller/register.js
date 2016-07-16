define(["require", "exports"], function (require, exports) {
    "use strict";
    function register($scope, $rootScope, $location, $interval, AjaxService, ToolService) {
        $scope.phone = ""; //手机号码
        $scope.password = ""; //密码
        $scope.passwordAgian = ""; //确认密码
        $scope.code = ""; //验证码
        $scope.codeText = "获取短信验证码";
        $scope.referralCode = "";
        $scope.codeState = true; //验证码按钮是否可用
        $scope.disable = false;
        $scope.phoneCheckResult = false;
        // 验证码按钮处理函数
        $scope.getCode = function () {
            if ($scope.codeState) {
                if ($scope.phoneCheckResult) {
                    // 发送短信验证码
                    AjaxService.post({
                        url: ToolService.host + "/wx/register/sendsmsregistercode",
                        data: { "phone": $scope.phone }
                    }).then(function (data) {
                        if (data.code == 0) {
                            var time = 59;
                            $scope.codeState = false;
                            var interval = $interval(function () {
                                $scope.codeText = (time + " S");
                                time--;
                            }, 1000, 60).then(function () {
                                $scope.codeText = "获取短信验证码";
                                $scope.codeState = true;
                                $interval.cancel(interval);
                            });
                        }
                        else {
                            ToolService.alert(data.message);
                        }
                    });
                }
                else {
                    ToolService.alert("请填写正确手机号码!");
                }
            }
        };
        // 检查手机号码是否可以注册
        $scope.phoneCheck = function () {
            if (/^1[3|4|5|7|8]\d{9}$/.test($scope.phone)) {
                AjaxService.post({
                    url: ToolService.host + "/wx/register/registercheck",
                    data: { name: "phone", param: $scope.phone },
                }).then(function (data) {
                    if (data.code == 0) {
                        $scope.phoneCheckResult = true;
                    }
                    else {
                        ToolService.alert(data.message);
                    }
                });
            }
            else {
                $scope.phoneCheckResult = false;
                ToolService.alert("手机号码不正确！");
            }
        };
        // 检查输入是否符合要求
        var check = function () {
            if (/^1[3|4|5|7|8]\d{9}$/.test($scope.phone) && $scope.password.length >= 8 && $scope.password.length <= 20 && $scope.password == $scope.passwordAgian) {
                return true;
            }
            else {
                if (!(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone))) {
                    ToolService.alert("手机号码错误，请仔细检查!");
                    return false;
                }
                else if ($scope.password.length < 8 || $scope.password.length > 20) {
                    ToolService.alert("密码长度不符合要求，请输入8-20位的密码!");
                    return false;
                }
                else if ($scope.password != $scope.passwordAgian) {
                    ToolService.alert("两次输入的密码不一致，请重新输入!");
                    return false;
                }
                else {
                    ToolService.alert("手机号码或者密码错误，请重新输入!");
                    return false;
                }
            }
        };
        // 验证短信验证码是否正确
        var codeCheck = function (callback) {
            AjaxService.post({
                url: ToolService.host + "/wx/register/registercheck",
                data: { name: "verifyCode", param: $scope.code, p: $scope.phone },
            }).then(function (data) {
                if (data.code == 0) {
                    callback();
                }
                else {
                    ToolService.alert(data.message);
                }
            });
        };
        // 注册按钮处理函数
        $scope.register = function () {
            if (check()) {
                codeCheck($scope.registering);
            }
        };
        // 注册
        $scope.registering = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/register/register",
                data: { phone: $scope.phone, verifyCode: $scope.code, password: $scope.password, referralCode: $scope.referralCode },
            }).then(function (data) {
                if (data.code == 0) {
                    ToolService.setLocal("user", data.data);
                    ToolService.alert("注册成功!", function () {
                        $rootScope.messageTip.has = false;
                        ToolService.changeRoute("/user");
                    });
                }
                else {
                    ToolService.alert(data.message);
                }
            });
        };
        // 初始化页面
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
        if ($location.search().code) {
            $scope.referralCode = $location.search().code;
        }
    }
    return register;
});
//# sourceMappingURL=register.js.map