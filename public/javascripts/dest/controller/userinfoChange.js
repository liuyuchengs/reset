define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    function userChange($scope, $rootScope, $location, $timeout, $http, AjaxService, ToolService) {
        $scope.title;
        $scope.tip;
        $scope.val = "";
        $scope.hasImg = false;
        $scope.input = {
            has: false,
            url: null
        };
        $scope.sexparams = {
            men: true,
            women: false
        };
        $scope.payParams = {
            flag: null,
            state: null,
            account: null,
            accessToken: null,
        };
        $scope.titleParams = {
            "realname": "真实姓名",
            "sex": "选择性别",
            "phone": "手机号码",
            "age": "年龄",
            "nickname": "昵称",
            "wxpay": "账号",
            "alipay": "账号"
        };
        $scope.tipParams = {
            "realname": "请填写姓名",
            "sex": "请填写性别",
            "phone": "请填写手机号码",
            "age": "请填写年龄",
            "nickname": "请填写昵称",
            "wxpay": "请填写微信账号",
            "alipay": "请填写支付宝账号",
        };
        //监听input
        var listen = function () {
            $("#input1").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.input.has = true;
                $scope.input.url = url;
                $scope.$apply();
            });
        };
        // 获取input元素图片的url，做图片预览
        $scope.getUrl = function (obj) {
            var url = null;
            if (window.URL != undefined) {
                url = window.URL.createObjectURL(obj);
            }
            return url;
        };
        //选择图片
        $scope.choosePic = function () {
            $timeout(function () {
                $("#input1").click();
            }, 0);
        };
        //删除选定图片
        $scope.removePic = function () {
            $scope.input.has = false;
            $scope.input.url = "";
            var element = document.getElementById("input1");
            element.outerHTML = element.outerHTML;
            listen();
        };
        //检查内容是否符合要求
        $scope.check = function () {
            if ($scope.val.length == 0) {
                ToolService.alert("填写内容为空！");
                return false;
            }
            else if ($scope.item == "realname" || $scope.item == "nickname") {
                if ($scope.val.length > 1 && $scope.val.length < 10) {
                    return true;
                }
                else {
                    ToolService.alert("请输入正确长度的名称！");
                    return false;
                }
            }
            else if ($scope.item == "sex") {
                if ($scope.val == "男" || $scope.val == "女") {
                    return true;
                }
                else {
                    ToolService.alert("请输入正确的性别！");
                    return false;
                }
            }
            else if ($scope.item == "phone") {
                if (/^1[3|4|5|7|8]\d{9}$/.test($scope.val)) {
                    return true;
                }
                else {
                    ToolService.alert("请输入正确的手机号码!");
                    return false;
                }
            }
            else if ($scope.item == "age") {
                if (parseInt($scope.val) > 0 && parseInt($scope.val) < 150) {
                    $scope.val = parseInt($scope.val);
                    return true;
                }
                else {
                    ToolService.alert("请输入正确的年龄!");
                    return false;
                }
            }
            else if ($scope.item == "wxpay" || $scope.item == "alipay") {
                if ($scope.val.length < 3) {
                    ToolService.alert("长度过低!");
                    return false;
                }
                else {
                    return true;
                }
            }
            else if ($scope.item == "img") {
                if ($scope.input.has) {
                    return true;
                }
                else {
                    ToolService.alert("请选择照片");
                    return false;
                }
            }
            else {
                ToolService.alert("未识别需要修改的项目,请稍后再试!");
                return false;
            }
        };
        //选择性别
        $scope.select = function (value) {
            if (value == "男") {
                if (!$scope.sexparams.men) {
                    $scope.sexparams.men = true;
                    $scope.sexparams.women = false;
                    $scope.val = "男";
                    return;
                }
            }
            else if (value = "女") {
                if (!$scope.sexparams.women) {
                    $scope.sexparams.men = false;
                    $scope.sexparams.women = true;
                    $scope.val = "女";
                }
            }
        };
        //修改信息
        $scope.change = function () {
            if (ToolService.checkLogin()) {
                if ($scope.item === "wxpay" || $scope.item === "alipay") {
                    $scope.payParams.account = $scope.val;
                    $scope.payParams.accessToken = ToolService.user.accessToken;
                    AjaxService.post({
                        url: ToolService.host + "/wx/withDraw/bound",
                        data: $scope.payParams,
                    }).then(function (data) {
                        if (data.code == 0) {
                            if ($scope.payParams.flag == 1) {
                                ToolService.user.alipay = $scope.val;
                            }
                            if ($scope.payParams.flag == 2) {
                                ToolService.user.wxpay = $scope.val;
                            }
                            ToolService.setLocal("user", ToolService.user);
                            ToolService.alert("绑定成功!", function () {
                                $rootScope.messageTip.has = false;
                                ToolService.changeRoute("/user/userinfo");
                            });
                        }
                        else {
                            ToolService.alert("绑定失败,请稍后再试!");
                        }
                    });
                }
                else {
                    $rootScope.load.has = true;
                    var infoData = new FormData();
                    var url = ToolService.host + "/wx/mycount/updateUserInfo";
                    infoData.append("name", $scope.item);
                    infoData.append("val", $scope.val);
                    if ($scope.input.has) {
                        infoData.append("headImage", $("#input1").get(0).files[0]);
                    }
                    else {
                        infoData.append("headImage", new Blob([""], { type: "image/jpeg" }));
                    }
                    $http.post(url, infoData, {
                        headers: {
                            "accessToken": ToolService.user.accessToken,
                            "Content-Type": undefined,
                        }
                    }).success(function (data) {
                        $rootScope.load.has = false;
                        if (data.code == 0) {
                            ToolService.setLocal("user", data.data);
                            ToolService.changeRoute("/user/userinfo");
                        }
                        else if (data.code == 1) {
                            ToolService.alert(data.message);
                        }
                    }).error(function () {
                        $rootScope.load.has = false;
                        ToolService.alert("数据更新失败!");
                    });
                }
            }
        };
        //页面初始化
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
        if (ToolService.checkLogin()) {
            ToolService.loadUser();
            $scope.item = $location.search().item;
            $scope.title = $scope.titleParams[$scope.item];
            $scope.tip = $scope.tipParams[$scope.item];
            if ($scope.item == "sex") {
                $scope.hassex = true;
                $scope.val = "男";
            }
            else {
                $scope.hasinput = true;
            }
            if ($scope.item === "img") {
                $scope.hasImg = true;
                $scope.val = "img";
                listen();
            }
            else {
                $scope.hasImg = false;
            }
            if ($scope.item === "wxpay") {
                $scope.payParams.flag = 2;
            }
            if ($scope.item === "alipay") {
                $scope.payParams.flag = 1;
            }
            if ($location.search().state) {
                $scope.payParams.state = $location.search().state;
            }
        }
        else {
            ToolService.changeRoute("/user");
        }
    }
    return userChange;
});
//# sourceMappingURL=userinfoChange.js.map