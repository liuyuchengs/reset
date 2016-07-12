define(["require", "exports"], function (require, exports) {
    "use strict";
    function write($scope, $rootScope, $http, ToolService, AjaxService) {
        $scope.postData = new FormData();
        $scope.noBeforeSelect = true;
        $scope.noAfterSelect = true;
        $scope.beforeParams = {
            input1: { has: false, url: "", val: "#input1" },
            input2: { has: false, url: "", val: "#input2" },
            input3: { has: false, url: "", val: "#input3" },
            input4: { has: false, url: "", val: "#input4" },
            input5: { has: false, url: "", val: "#input5" },
            input6: { has: false, url: "", val: "#input6" },
        };
        $scope.afterParams = {
            input7: { has: false, url: "", val: "#input7" },
            input8: { has: false, url: "", val: "#input8" },
            input9: { has: false, url: "", val: "#input9" },
        };
        $scope.queryParams = {
            postName: null,
            postIntro: null,
            postContent: null,
            hospitalId: null,
            doctorId: null,
            productId: null,
            img1: null,
            img2: null,
            img3: null,
            p1: null,
            p2: null,
            p3: null,
            flag: 1,
        };
        //发帖类型信息
        $scope.switchParams = [
            { has: true, val: "看牙", id: 1 },
            { has: false, val: "求美", id: 2 },
            { has: false, val: "孕·生", id: 3 }
        ];
        $scope.order = {
            has: false,
            orderInfo: null,
        };
        $scope.select = {
            has: false,
            value: ""
        };
        // 跳转到具体的发帖页面
        $scope.goTo = function (path) {
            if (ToolService.checkLogin()) {
                ToolService.changeRoute(path);
            }
            else {
                ToolService.comfirm("您还没有登录，请先登录", function () {
                    $rootScope.messageTip.has = false;
                    ToolService.changeRoute("/user");
                });
            }
        };
        // 监听input元素选择图片
        $scope.listen = function () {
            $("#input1").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.beforeParams.input1.has = true;
                $scope.beforeParams.input1.url = url;
                $scope.noBeforeSelect = false;
                $scope.$apply();
            });
            $("#input2").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.beforeParams.input2.has = true;
                $scope.beforeParams.input2.url = url;
                $scope.noBeforeSelect = false;
                $scope.$apply();
            });
            $("#input3").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.beforeParams.input3.has = true;
                $scope.beforeParams.input3.url = url;
                $scope.noBeforeSelect = false;
                $scope.$apply();
            });
            $("#input4").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.beforeParams.input4.has = true;
                $scope.beforeParams.input4.url = url;
                $scope.noBeforeSelect = false;
                $scope.$apply();
            });
            $("#input5").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.beforeParams.input5.has = true;
                $scope.beforeParams.input5.url = url;
                $scope.noBeforeSelect = false;
                $scope.$apply();
            });
            $("#input6").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.beforeParams.input6.has = true;
                $scope.beforeParams.input6.url = url;
                $scope.noBeforeSelect = false;
                $scope.$apply();
            });
            $("#input7").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.afterParams.input7.has = true;
                $scope.afterParams.input7.url = url;
                $scope.noAfterSelect = false;
                $scope.$apply();
            });
            $("#input8").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.afterParams.input8.has = true;
                $scope.afterParams.input8.url = url;
                $scope.noAfterSelect = false;
                $scope.$apply();
            });
            $("#input9").on("change", function () {
                var url = $scope.getUrl(this.files[0]);
                $scope.afterParams.input9.has = true;
                $scope.afterParams.input9.url = url;
                $scope.noAfterSelect = false;
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
        // 切换发帖类型
        $scope.switch = function (index) {
            ToolService.select(index, $scope.switchParams);
            if ($scope.switchParams[index]) {
                $scope.queryParams.flag = $scope.switchParams[index].id;
            }
        };
        // 调整随便聊聊照片参数
        $scope.mergeSay = function () {
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
            $scope.postData.append("postName", $scope.queryParams.postName);
            $scope.postData.append("postContent", $scope.queryParams.postContent);
            $scope.postData.append("flag", $scope.queryParams.flag);
            $scope.postData.append("postFlags", 2);
        };
        // 调整写日记参数
        $scope.mergeNote = function () {
            var imgStr = "img";
            var beforeCount = 1;
            var file = new Blob([""], { type: "image/jpeg" });
            for (var index in $scope.beforeParams) {
                var prototypeB = $scope.beforeParams[index];
                if (prototypeB.has) {
                    $scope.postData.append(imgStr + beforeCount, $(prototypeB.val).get(0).files[0]);
                    beforeCount++;
                }
            }
            if (beforeCount < 4) {
                for (; beforeCount < 4; beforeCount++) {
                    $scope.postData.append(imgStr + beforeCount, file);
                }
            }
            var pStr = "p";
            var afterCount = 1;
            for (var index in $scope.afterParams) {
                var prototypeA = $scope.afterParams[index];
                if (prototypeA.has) {
                    $scope.postData.append(pStr + afterCount, $(prototypeA.val).get(0).files[0]);
                    afterCount++;
                }
            }
            if (afterCount < 4) {
                for (; afterCount < 4; afterCount++) {
                    $scope.postData.append(pStr + afterCount, file);
                }
            }
            $scope.postData.append("postName", $scope.queryParams.postName);
            $scope.postData.append("postContent", $scope.queryParams.postContent);
            $scope.postData.append("flag", $scope.queryParams.flag);
            $scope.postData.append("productId", $scope.queryParams.productId);
            $scope.postData.append("doctorId", $scope.queryParams.doctorId);
            $scope.postData.append("hospitalId", $scope.queryParams.hospitalId);
            $scope.postData.append("postFlags", 1);
        };
        // 发帖功能
        $scope.addPost = function (merge) {
            if ($scope.queryParams.postName == "" || $scope.queryParams.postName == null || $scope.queryParams.postContent == "" || $scope.queryParams.postContent == null) {
                ToolService.alert("请填写发帖内容!");
            }
            else {
                var url = ToolService.host + "/wx/post/addPost";
                merge();
                $rootScope.load.has = true;
                $http.post(url, $scope.postData, {
                    headers: {
                        "Content-Type": undefined,
                        "accessToken": ToolService.user.accessToken,
                    }
                }).success(function (data) {
                    $rootScope.load.has = false;
                    if (data.code == 0) {
                        ToolService.changeRoute("/interaction");
                    }
                    else {
                        ToolService.alert("连接失败，请稍后再试!");
                    }
                }).error(function () {
                    $rootScope.load.has = false;
                    $scope.postData = new FormData();
                    ToolService.alert("连接失败，请稍后再试!");
                });
            }
        };
        // 发布随便说说帖子
        $scope.addSayPost = function () {
            $scope.addPost($scope.mergeSay);
        };
        // 发布写日记
        $scope.addNotePost = function () {
            if (!$scope.select.has) {
                if ($scope.queryParams.productId == null || $scope.queryParams.hospitalId == null || $scope.queryParams.doctorId == null) {
                    ToolService.alert("请选择项目信息");
                }
                else {
                    $scope.addPost($scope.mergeNote);
                }
            }
            else {
                ToolService.alert("您还没有已完成的项目，暂不能写日记");
            }
        };
        // 触发随便说说选择照片
        $scope.chooseSayPic = function () {
            var count = 0;
            for (var item in $scope.beforeParams) {
                var prototype = $scope.beforeParams[item];
                count++;
                if (!prototype.has) {
                    $(prototype.val).click();
                    return;
                }
            }
            if (count == 6) {
                ToolService.alert("最多只能上传6张图片!");
            }
        };
        // 触发写日记选择术前照片
        $scope.chooseBeforePic = function () {
            var count = 0;
            for (var item in $scope.beforeParams) {
                count++;
                if (count < 4) {
                    var prototype = $scope.beforeParams[item];
                    if (!prototype.has) {
                        $(prototype.val).click();
                        return;
                    }
                }
                else {
                    ToolService.alert("术后最多上传三张照片");
                }
            }
        };
        // 触发写日记选择术后照片
        $scope.chooseAfterPic = function () {
            var count = 0;
            for (var item in $scope.afterParams) {
                count++;
                var prototype = $scope.afterParams[item];
                if (!prototype.has) {
                    $(prototype.val).click();
                    return;
                }
            }
            if (count == 3) {
                ToolService.alert("术后最多上传三张照片");
            }
        };
        // 删除术前图片
        $scope.removeBefore = function (item) {
            if ($scope.beforeParams[item]) {
                $scope.beforeParams[item].has = false;
                $scope.beforeParams[item].url = "";
                $scope.clear(item);
                $scope.listen(); //替换input后重新监听
            }
        };
        // 删除术后图片
        $scope.removeAfter = function (item) {
            if ($scope.afterParams[item]) {
                $scope.afterParams[item].has = false;
                $scope.afterParams[item].url = "";
                $scope.clear(item);
                $scope.listen(); //替换input后重新监听
            }
        };
        // 重新替换要重新选择图片的input元素
        $scope.clear = function (selector) {
            var element = document.getElementById(selector);
            element.outerHTML = element.outerHTML; //重新替换Input元素
        };
        // 发帖页面加载用户已完成订单信息
        $scope.loadOrder = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/order/queryOrderList",
                data: { status: "", userId: ToolService.user.id },
                headers: {
                    accessToken: ToolService.user.accessToken
                }
            }).then(function (data) {
                if (data.code === 0) {
                    var result = data.data.filter(function (item) {
                        return item.status == 4;
                    });
                    if (result.length > 0) {
                        $scope.order.has = true;
                        $scope.order.orderInfo = result;
                    }
                    for (var index in $scope.order.orderInfo) {
                        $scope.order.orderInfo[index].has = false;
                    }
                }
            });
        };
        // 触发项目选择
        $scope.chooseOrder = function () {
            if ($scope.order.has) {
                $scope.select.has = !$scope.select.has;
            }
            else {
                ToolService.alert("您还没有已完成的项目，暂不能写日记");
            }
        };
        // 选择项目
        $scope.chooseProduct = function (id) {
            //先清理掉以选择的项
            for (var prototype in $scope.order.orderInfo) {
                if ($scope.order.orderInfo[prototype].has) {
                    $scope.order.orderInfo[prototype].has = false;
                    $scope.queryParams.productId = null;
                    $scope.queryParams.doctorId = null;
                    $scope.queryParams.hospitalId = null;
                }
            }
            //再选择要选择的项
            for (var prototype in $scope.order.orderInfo) {
                if ($scope.order.orderInfo[prototype].id == id) {
                    $scope.order.orderInfo[prototype].has = true;
                    $scope.select.value = $scope.order.orderInfo[prototype].productName;
                    $scope.select.has = false;
                    $scope.queryParams.productId = $scope.order.orderInfo[prototype].productId;
                    $scope.queryParams.doctorId = $scope.order.orderInfo[prototype].doctorId;
                    $scope.queryParams.hospitalId = $scope.order.orderInfo[prototype].hospitalId;
                }
            }
        };
        //初始化页面
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
        if (ToolService.checkLogin()) {
            ToolService.loadUser();
            $scope.loadOrder();
            $scope.listen();
        }
        else {
            ToolService.comfirm("请先登录", function () {
                $rootScope.followTip.has = false;
                ToolService.changeRoute("/login");
            });
        }
    }
    return write;
});
