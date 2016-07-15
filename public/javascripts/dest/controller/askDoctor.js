define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    function askDoctor($scope, $rootScope, $location, $http, ToolService, AjaxService) {
        $scope.hasSee = true;
        $scope.content = null;
        $scope.noSelect = true;
        $scope.postData = new FormData();
        $scope.doctorId = null;
        $scope.params = {
            input1: { has: false, url: "", val: "#input1" },
            input2: { has: false, url: "", val: "#input2" },
            input3: { has: false, url: "", val: "#input3" },
            input4: { has: false, url: "", val: "#input4" },
            input5: { has: false, url: "", val: "#input5" },
            input6: { has: false, url: "", val: "#input6" },
        };
        //获取医生id参数
        var getParams = function () {
            if ($location.search().id) {
                $scope.doctorId = $location.search().id;
            }
            else {
                history.back();
            }
        };
        //切换是否医生可见
        $scope.chooseSee = function () {
            $scope.hasSee = !$scope.hasSee;
        };
        // 监听input元素选择图片
        var listen = function () {
            $("#input1").on("change", function () {
                var url = getUrl(this.files[0]);
                $scope.params.input1.has = true;
                $scope.params.input1.url = url;
                $scope.noSelect = false;
                $scope.$apply();
            });
            $("#input2").on("change", function () {
                var url = getUrl(this.files[0]);
                $scope.params.input2.has = true;
                $scope.params.input2.url = url;
                $scope.noSelect = false;
                $scope.$apply();
            });
            $("#input3").on("change", function () {
                var url = getUrl(this.files[0]);
                $scope.params.input3.has = true;
                $scope.params.input3.url = url;
                $scope.noSelect = false;
                $scope.$apply();
            });
            $("#input4").on("change", function () {
                var url = getUrl(this.files[0]);
                $scope.params.input4.has = true;
                $scope.params.input4.url = url;
                $scope.noSelect = false;
                $scope.$apply();
            });
            $("#input5").on("change", function () {
                var url = getUrl(this.files[0]);
                $scope.params.input5.has = true;
                $scope.params.input5.url = url;
                $scope.noSelect = false;
                $scope.$apply();
            });
            $("#input6").on("change", function () {
                var url = getUrl(this.files[0]);
                $scope.params.input6.has = true;
                $scope.params.input6.url = url;
                $scope.noSelect = false;
                $scope.$apply();
            });
        };
        //获取input元素图片的url，做图片预览
        var getUrl = function (obj) {
            var url = null;
            if (URL.createObjectURL(obj)) {
                url = URL.createObjectURL(obj);
            }
            return url;
        };
        // 触发随便说说选择照片
        $scope.choosePic = function () {
            var count = 0;
            for (var item in $scope.params) {
                count++;
                var prototype = $scope.params[item];
                if (!prototype.has) {
                    prototype.has = true;
                    $(prototype.val).click();
                    return;
                }
            }
            if (count == 6) {
                ToolService.alert("最多只能上传6张图片!");
            }
        };
        // 删除图片
        $scope.remove = function (item) {
            if ($scope.params[item]) {
                $scope.params[item].has = false;
                $scope.params[item].url = "";
                var element = document.getElementById(item);
                element.outerHTML = element.outerHTML; //重新替换Input元素
                $scope.listen(); //替换input后重新监听
            }
        };
        // 调整照片参数
        $scope.mergePic = function () {
            var imgStr = "img";
            var pStr = "p";
            var count = 1;
            var afterCount = 3;
            var file = new Blob([""], { type: "image/jpeg" });
            for (var index in $scope.beforeParams) {
                var prototype = $scope.beforeParams[index];
                if (prototype.has) {
                    if (count < 4) {
                        $scope.postData.append(imgStr + count, $(prototype.val).get(0).files[0]);
                        count++;
                    }
                    else {
                        $scope.postData.append(pStr + (count - afterCount), $(prototype.val).get(0).files[0]);
                        count++;
                    }
                }
            }
            for (count; count < 7; count++) {
                if (count < 4) {
                    $scope.postData.append(imgStr + count, file);
                }
                else {
                    $scope.postData.append(pStr + (count - afterCount), file);
                }
            }
        };
        // 提交提问
        $scope.send = function () {
            if ($scope.content === null || $scope.content === "") {
                ToolService.alert("请填写咨询内容!");
            }
            else {
                var url = ToolService.host + "/wx/post/addPost";
                $scope.mergePic();
                $scope.postData.append("postName", "");
                $scope.postData.append("postContent", $scope.content);
                $scope.postData.append("postFlags", 3);
                $scope.postData.append("doctorId", $scope.doctorId);
                $rootScope.load.has = false;
                $http.post(url, $scope.postData, {
                    headers: {
                        "Content-Type": undefined,
                        "accessToken": ToolService.user.accessToken,
                    }
                }).success(function (data) {
                    $rootScope.load.has = false;
                    if (data.code == 0) {
                        history.back();
                    }
                    else {
                        ToolService.alert("连接数据失败，请稍后再试!");
                    }
                }).error(function () {
                    $rootScope.load.has = false;
                    $scope.postData = new FormData();
                    ToolService.alert("连接失败，请稍后再试!");
                });
            }
        };
        //返回上一页
        $scope.back = function () {
            history.back();
        };
        //初始化页面
        $rootScope.globalProp.hasBgColor = true;
        ToolService.cancelWindowListen();
        getParams();
        if (ToolService.checkLogin()) {
            ToolService.loadUser();
        }
        else {
            ToolService.comfirm("请先登录", function () {
                $rootScope.messageTip.has = false;
                ToolService.changeRoute("/login");
            });
        }
        listen();
    }
});
//# sourceMappingURL=askDoctor.js.map