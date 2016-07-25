define(["require", "exports", "Swiper"], function (require, exports, Swiper) {
    "use strict";
    function doctorDetail($scope, $rootScope, $location, $anchorScroll, AjaxService, ToolService) {
        $scope.hasTime = false;
        $scope.hasProduct = false;
        $scope.description = {
            has: false,
            val: "查看全部",
        };
        $scope.use = {
            has: false,
            val: "查看全部"
        };
        $scope.follow = {
            hasFollow: false,
            followText: "关注"
        };
        $scope.id = null;
        $scope.doctorInfo = {};
        $scope.assessInfo = [];
        $scope.time = {
            hasSelect: false,
            openSelect: false,
            selectIndex: null,
            selectObj: null,
            selectId: null,
            noTime: false,
            timeList: [],
        };
        $scope.order = {
            hospitalId: "",
            doctorId: "",
            productId: "",
            scheduleId: "",
            doctorName: "",
            treatmentTime: "",
            hospitalName: "",
            hospitalAddress: "",
            preferPrice: "",
            productName: "",
            flag: 1,
            dealMoney: "",
            payMoney: "",
            realMoney: "",
            giftMoney: "",
            code: null,
            discountid: null,
        };
        // 医生评价参数
        $scope.queryParams = {
            id: null,
            currentPage: 1,
            pageRows: 10,
        };
        // 初始化swiper
        var initSwiper = function () {
            $scope.mySwiper = new Swiper('.swiper-container', {
                slidesPerView: 4,
                slidesPerGroup: 4,
                observeParents: true,
                observer: true
            });
        };
        // swiper跳转到指定页
        $scope.toPage = function (params, $event) {
            if (params === "per") {
                $scope.mySwiper.slidePrev();
            }
            if (params === "next") {
                $scope.mySwiper.slideNext();
            }
            $event.stopPropagation();
        };
        // 切换选择就医时间
        $scope.selectTime = function () {
            $scope.hasTime = !$scope.hasTime;
        };
        // 切换选择就医项目
        $scope.selectProduct = function () {
            $scope.hasProduct = !$scope.hasProduct;
        };
        // 获取查询参数
        var getParams = function () {
            if ($location.search().id) {
                $scope.id = $location.search().id;
                $scope.queryParams.id = $scope.id;
            }
            else {
                ToolService.changeRoute("/doctor");
            }
        };
        // 收起和隐藏医生简介
        $scope.showDescription = function () {
            $scope.description.has = !$scope.description.has;
            if ($scope.description.has) {
                $scope.description.val = "收起简介";
            }
            else {
                $scope.description.val = "查看全部";
            }
        };
        // 收起和隐藏擅长简介
        $scope.showUse = function () {
            $scope.use.has = !$scope.use.has;
            if ($scope.use.has) {
                $scope.use.val = "收起简介";
            }
            else {
                $scope.use.val = "查看全部";
            }
        };
        // 获取医生信息
        var queryDoctor = function () {
            var params = { needPackageInfo: true, id: $scope.id, accessToken: "" };
            if (ToolService.checkLogin()) {
                ToolService.loadUser();
                params.accessToken = ToolService.user.accessToken;
            }
            else {
                params.accessToken = null;
            }
            AjaxService.post({
                url: ToolService.host + "/wx/doctor/queryDoctorDetailInfo",
                data: params,
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.order.doctorName = data.data.doctorName;
                    $scope.order.doctorId = data.data.id;
                    $scope.order.hospitalId = data.data.hospitalId;
                    $scope.order.hospitalName = data.data.hospitalname;
                    $scope.order.hospitalAddress = data.data.hospitaladdress;
                    mergeDoctor(data.data);
                    $scope.doctorInfo = data.data;
                }
            });
        };
        // 检查医生信息
        var mergeDoctor = function (ele) {
            ToolService.empty(ele.score) ? ele.score = "暂无评分" : ele.score += "分";
            if (ele.focusState == 1) {
                $scope.follow.hasFollow = true;
                $scope.follow.followText = "已关注";
            }
            ele.dentallist.forEach(function (item) {
                if (!ToolService.empty(item.priceunit)) {
                    item.preferPriceType = item.pricetype + "/" + item.priceunit;
                }
                else {
                    item.preferPriceType = item.pricetype;
                }
            });
        };
        // 获取医生排班信息
        var querySchedule = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/order/querybydoctorid",
                data: { doctorId: $scope.id },
            }).then(function (data) {
                if (data.code == 0) {
                    if (data.data.length > 0) {
                        mergeSchedule(data.data);
                    }
                    else {
                        $scope.time.noTime = true;
                    }
                }
            });
        };
        // 检查医生排班信息
        var mergeSchedule = function (items) {
            var initBoolean = true;
            items.forEach(function (item) {
                var childrenList = [];
                if (item.timeList.length > 0) {
                    item.timeList.forEach(function (childrenItem) {
                        childrenList.push({
                            has: false,
                            id: childrenItem.scheduleid,
                            val: childrenItem.starttime,
                        });
                    });
                }
                $scope.time.timeList.push({
                    has: initBoolean,
                    val: item.date.slice(5, 10),
                    id: item.scheduleid,
                    children: childrenList,
                });
                initBoolean = false;
            });
        };
        // 获取医生评价信息
        var queryAssess = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/review/showdoctorreview",
                data: $scope.queryParams
            }).then(function (data) {
                if (data.code == 0) {
                    data.data.forEach(function (item) {
                        if (item.totalscore == null) {
                            item.totalscore = "暂无评分";
                        }
                        else {
                            item.totalscore = item.totalscore + "分";
                        }
                    });
                    $scope.assessInfo = data.data;
                }
            });
        };
        // 切换导航栏
        $scope.switchDay = function (index, $event) {
            ToolService.select(index, $scope.time.timeList);
            $event.stopPropagation();
        };
        // 选择时间
        $scope.selectTime = function (index, obj, $event) {
            $event.stopPropagation();
            if ($scope.time.selectIndex == null) {
                $scope.time.selectIndex = index;
                $scope.time.selectObj = obj;
                ToolService.select(index, obj.children);
            }
            else {
                ToolService.select($scope.time.selectIndex, $scope.time.selectObj.children, true);
                $scope.time.selectIndex = index;
                $scope.time.selectObj = obj;
                ToolService.select(index, obj.children);
            }
            $scope.time.hasSelect = true;
            $scope.order.scheduleId = obj.children[index].id;
            $scope.order.treatmentTime = obj.val + " " + obj.children[index].val;
            $scope.time.openSelect = false;
        };
        // 获取money以及跳转页面
        $scope.orderDetail = function (id, title, price) {
            if (!$scope.time.noTime) {
                if ($scope.time.hasSelect) {
                    if (!ToolService.checkLogin()) {
                        ToolService.comfirm("请先登录并完善个人信息", function () {
                            $rootScope.messageTip.has = false;
                            ToolService.changeRoute("/login");
                        });
                    }
                    else if (!ToolService.infoComplete()) {
                        ToolService.comfirm("请完善个人信息!", function () {
                            $rootScope.messageTip.has = false;
                            ToolService.changeRoute("/user/userInfo");
                        });
                    }
                    else {
                        $scope.order.productId = id;
                        $scope.order.productName = title;
                        $scope.order.preferPrice = "￥" + price;
                        ToolService.loadUser();
                        AjaxService.post({
                            url: ToolService.host + "/wx/order/checkCodeMoney",
                            data: { productId: $scope.order.productId },
                            headers: {
                                "accessToken": ToolService.user.accessToken
                            }
                        }).then(function (data) {
                            $scope.order.dealMoney = data.dealMoney;
                            $scope.order.payMoney = data.payMoney;
                            $scope.order.realMoney = data.realMoney;
                            $scope.order.giftMoney = data.giftMoney;
                            if (parseFloat($scope.order.giftMoney) <= 0) {
                                $scope.order.flag = null;
                            }
                            ToolService.setSession("makeorder", $scope.order);
                            ToolService.changeRoute("/makeorder");
                        });
                    }
                }
                else {
                    ToolService.alert("请先预约就医时间!");
                }
            }
            else {
                ToolService.alert("此医生没有排班，暂不能下单。去其他医生看看吧!");
            }
        };
        // 打开时间选择窗口
        $scope.openSelect = function () {
            if ($scope.time.noTime) {
                ToolService.alert("此医生没有排班，暂不能下单。去其他医生看看吧!");
            }
            else {
                $scope.time.openSelect = true;
            }
        };
        // 隐藏时间选择窗口
        $scope.hideSelect = function () {
            $scope.time.openSelect = false;
        };
        // 跳转到咨询页面
        $scope.ask = function () {
            if (ToolService.checkLogin()) {
                ToolService.loadUser();
                ToolService.changeRoute("/doctor/askDoctor", "id=" + $scope.id);
            }
            else {
                ToolService.comfirm("请先登录", function () {
                    $rootScope.messageTip.has = false;
                    ToolService.changeRoute("/login");
                });
            }
        };
        // 跳到医生评价
        $scope.goAssess = function () {
            $anchorScroll("doctorAssess");
        };
        // 关注按钮处理函数
        $scope.switchFollow = function () {
            if (!ToolService.checkLogin()) {
                ToolService.comfirm("请先登录!", function () {
                    $rootScope.messageTip.has = false;
                    ToolService.changeRoute("/login");
                });
            }
            else {
                ToolService.loadUser();
                if ($scope.follow.hasFollow) {
                    cacelFollow();
                }
                else {
                    tofollow();
                }
            }
        };
        // 关注发帖医生
        var tofollow = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/post/focus",
                data: { flag: 2, userId: $scope.id },
                headers: {
                    'accessToken': ToolService.user.accessToken,
                }
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.follow.hasFollow = true;
                    $scope.follow.followText = "已关注";
                }
                else {
                    ToolService.alert("关注失败，稍后再试!");
                }
            });
        };
        // 取消关注医生
        var cacelFollow = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/post/cacelFocus",
                data: { flag: 2, userId: $scope.id },
                headers: {
                    'accessToken': ToolService.user.accessToken,
                }
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.follow.hasFollow = false;
                    $scope.follow.followText = "关注";
                }
                else {
                    ToolService.alert("取消关注失败，稍后再试!");
                }
            });
        };
        //返回按钮
        $scope.back = function () {
            window.history.back();
        };
        //初始化页面
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
        getParams();
        queryDoctor();
        querySchedule();
        initSwiper();
        queryAssess();
    }
    return doctorDetail;
});
//# sourceMappingURL=doctorDetail.js.map