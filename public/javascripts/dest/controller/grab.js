define(["require", "exports"], function (require, exports) {
    "use strict";
    function grab($scope, $rootScope, $window, $location, ToolService, AjaxService, WeixinService) {
        $scope.queryParams = {
            dayDate: "",
            professionId: 2,
            city: "深圳",
            currentPage: 1,
            area: "",
        };
        $scope.grabs = [];
        //是否显示分享窗口
        $scope.showTip = false;
        var shareObj = {
            title: "悠康医生是信息就医平台。",
            desc: "用悠康，有健康。悠康医生为您提供各类优惠医疗项目，快来看看吧!",
            link: "https://www.uokang.com/mobile/htmls/index.html#/home",
            imgUrl: "https://www.uokang.com/new/contents/img/logo.png",
            success: function () {
                ToolService.setLocal("share", "true");
                $scope.switchTip("close");
            },
            cancel: function () { }
        };
        //菜单项变量
        $scope.areaParams = ToolService.areaParams;
        $scope.dataParams = [];
        $scope.classParams = [
            { has: true, val: "洁牙", id: 2 },
            { has: false, val: "美容", id: 3 },
            { has: false, val: "推拿", id: 6 },
        ];
        $scope.menuParams = [
            { has: false, val: "区域", children: $scope.areaParams },
            { has: false, val: "分类", children: $scope.classParams },
            { has: false, val: "日期", children: $scope.dataParams }
        ];
        // 获取url参数
        var getQueryParams = function () {
            if ($location.search().item) {
                if ($location.search().item == "meirong") {
                    $scope.queryParams.professionId = 3;
                }
            }
        };
        // 加载日期时间
        var loadDate = function (callback) {
            AjaxService.get({
                url: ToolService.host + "/wx/gift/querydate",
            }).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (i == 0) {
                        $scope.dataParams.push({
                            has: true, val: item.value, id: item.value
                        });
                        $scope.queryParams.dayDate = item.value;
                    }
                    else {
                        $scope.dataParams.push({
                            has: false, val: item.value, id: item.value
                        });
                    }
                }
                if (callback) {
                    callback();
                }
            });
        };
        // 切换下拉菜单
        $scope.switchMenu = function (index, obj) {
            ToolService.select(index, obj, true);
            $rootScope.globalProp.hasBlackBg = obj[index].has;
        };
        // 点击下拉菜单项
        $scope.switchDrop = function (index, obj) {
            ToolService.select(index, obj);
            if (obj === $scope.areaParams) {
                $scope.queryParams.area = obj[index].id;
                $scope.menuParams[0].has = false;
            }
            if (obj === $scope.classParams) {
                $scope.queryParams.professionId = obj[index].id;
                $scope.menuParams[1].has = false;
            }
            if (obj === $scope.dataParams) {
                $scope.queryParams.dayDate = obj[index].val;
                $scope.menuParams[2].has = false;
            }
            $scope.grabs = [];
            $rootScope.followTip.has = false;
            loadData();
            $rootScope.globalProp.hasBlackBg = false;
        };
        // 加载数据
        var loadData = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/gift/queryproduct",
                data: $scope.queryParams
            }).then(function (data) {
                if (data.length < 1) {
                    if ($scope.grabs.length < 1) {
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }
                    else {
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }
                else {
                    merge(data);
                    $scope.grabs = $scope.grabs.concat(data);
                }
            });
        };
        // 处理数据
        var merge = function (items) {
            items.forEach(function (item) {
                if (item.amount == 0 || item.amount == null) {
                    item.noamount = true;
                    item.btnMess = "抢光了";
                }
                else {
                    item.noamount = false;
                    item.btnMess = "立即抢";
                }
            });
        };
        // 抢单按钮
        $scope.writeCode = function (noamount, productId, hospitalId) {
            if (noamount) {
                return;
            }
            else {
                if (ToolService.checkLogin()) {
                    if (ToolService.infoComplete()) {
                        ToolService.loadUser();
                        if (ToolService.user.giftCode == null || ToolService.user.giftCode == 0) {
                            ToolService.alert("一个用户只能享受一次免费项目，您已经抢过了!");
                        }
                        else {
                            if (ToolService.getLocal("share")) {
                                ToolService.changeRoute("/grab/code", "productId=" + productId + "&hospitalId=" + hospitalId + "&dayDate=" + $scope.queryParams.dayDate);
                            }
                            else {
                                WeixinService.wxShare(shareObj);
                                $scope.switchTip("open");
                            }
                        }
                    }
                    else {
                        ToolService.comfirm("请完善个人信息!", function () {
                            $rootScope.messageTip.has = false;
                            ToolService.changeRoute("/user");
                        });
                    }
                }
                else {
                    ToolService.comfirm("请先登录并完善个人信息!", function () {
                        $rootScope.messageTip.has = false;
                        ToolService.changeRoute("/login");
                    });
                }
            }
        };
        // 问题按钮
        $scope.question = function () {
            ToolService.alert("每个用户只可享受一次免费抢单，如需帮助请致电：0755-26905699");
        };
        // 切换tip窗口
        $scope.switchTip = function (params) {
            if (params === "close") {
                $scope.showTip = false;
            }
            if (params === "open") {
                $scope.showTip = true;
            }
        };
        // 页面初始化
        ToolService.reset();
        getQueryParams();
        loadDate(loadData);
        WeixinService.wxInit();
        WeixinService.wxConfig();
        ToolService.onWindowListen(function () {
            $scope.queryParams.currentPage++;
            loadData();
        });
    }
    return grab;
});
