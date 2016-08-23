define(["require", "exports"], function (require, exports) {
    "use strict";
    function productDetail($scope, $rootScope, $location, $http, ToolService, AjaxService) {
        $scope.selectTime = false;
        $scope.hasDoctor = false;
        $scope.noSelectTime = true;
        $scope.hasDocSchedule = "";
        $scope.selectDoc = "";
        $scope.hosId;
        $scope.proId;
        $scope.hasDiscount = false;
        $scope.productInfo;
        $scope.hospitalInfo;
        $scope.doctorInfo = [];
        $scope.activityp = "";
        $scope.follow = {
            hasFollow: false,
            followText: "关注"
        };
        $scope.scheduleInfo = [];
        $scope.scheduleParams = {};
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
            flag: null,
            dealMoney: "",
            payMoney: "",
            realMoney: "",
            giftMoney: "",
            code: null,
            discountid: null,
        };
        // 加载url参数
        let loadQueryParams = () => {
            $scope.hosId = $location.search().hospitalId;
            $scope.proId = $location.search().productId;
            if ($location.search().flag) {
                $scope.order.flag = $location.search().flag;
            }
            if ($location.search().discountid) {
                $scope.order.discountid = $location.search().discountid;
                $scope.hasDiscount = true;
            }
            if ($location.search().code) {
                $scope.order.code = $location.search().code;
            }
            if ($location.search().activityp) {
                $scope.activityp = $location.search().activityp;
            }
        };
        // 返回上一页
        $scope.back = () => {
            window.history.back();
        };
        // 查询项目信息
        let queryProduct = () => {
            var obj = {
                productId: $scope.proId
            };
            if (ToolService.checkLogin()) {
                ToolService.loadUser();
                obj.accessToken = ToolService.user.accessToken;
            }
            AjaxService.post({
                url: ToolService.host + "/wx/product/querybyid",
                data: obj
            }).then((data) => {
                if (data.data.focusState === 1) {
                    $scope.follow.hasFollow = true;
                    $scope.follow.followText = "已关注";
                }
                $scope.mergeProdcut(data.data);
                $scope.productInfo = data.data;
                $scope.order.productName = $scope.productInfo.title;
                $scope.order.preferPrice = "￥" + $scope.productInfo.preferPrice + $scope.productInfo.preferPriceType;
            });
        };
        // 查询项目图片
        let queryProductImg = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/image/querybymainid",
                data: { type: "PRODUCT", mainId: $scope.proId }
            }).then((data) => {
                if (data.length > 0) {
                    $scope.productImg = data;
                }
            });
        };
        // 加载医院信息
        let queryHospital = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/hospital/querybyid",
                data: { id: $scope.hosId }
            }).then((data) => {
                $scope.hospitalInfo = data;
                $scope.order.hospitalName = data.name;
                $scope.order.hospitalAddress = data.address;
            });
        };
        // 查询医院图片
        let queryHospitalImg = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/image/querybymainid",
                data: {
                    type: "HOSPITAL",
                    mainId: $scope.hosId
                }
            }).then((data) => {
                if (data.length > 0) {
                    $scope.hospitalImg = data;
                }
            });
        };
        // 查询医生信息
        let queryDoctor = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/doctor/queryscheduledoctorbyproductid",
                data: { productId: $scope.proId }
            }).then((data) => {
                if (data.list.length > 0) {
                    $scope.hasDoctor = true;
                    $scope.doctorInfo = data.list;
                    $scope.doctorInfo.forEach((item) => {
                        if (item.score == "" || item.score == null) {
                            item.score = "暂无评";
                        }
                        item.selectTimeValue = "请选择";
                        item.hasSelecTimeValue = false;
                    });
                }
            });
        };
        // 查询医生排班信息
        let queryDoctorSchedule = (docId) => {
            if ($scope.hasDocSchedule == docId) {
                $scope.selectTime = true;
            }
            else {
                AjaxService.post({
                    url: ToolService.host + "/wx/schedule/querybydoctorid",
                    data: { doctorId: docId }
                }).then((data) => {
                    $scope.mergeSchedule(data);
                    $scope.scheduleInfo = data;
                    $scope.loading = false;
                    $scope.selectTime = true;
                    $scope.hasDocSchedule = docId;
                });
            }
        };
        // 选择就医时间按钮
        $scope.chooseSchedule = (docId, name) => {
            $scope.order.doctorId = docId;
            $scope.order.doctorName = name;
            queryDoctorSchedule(docId);
            $scope.selectDoc = docId;
        };
        let selected = {
            index: 0,
            obj: { timeList: [] }
        };
        // 选择具体的就医时间
        $scope.chooseTime = (index, obj) => {
            if (selected.obj !== obj || (selected.obj === obj && selected.index !== index)) {
                if (selected.obj.timeList.length > 0) {
                    ToolService.select(selected.index, selected.obj.timeList, true);
                }
                selected.index = index;
                selected.obj = obj;
                ToolService.select(selected.index, selected.obj.timeList);
                $scope.order.scheduleId = obj.timeList[index].scheduleid;
                $scope.order.treatmentTime = obj.timeList[index].date;
                $scope.mergeDocSelect($scope.selectDoc, obj.timeList[index].date);
                $scope.selectTime = false;
                $scope.noSelectTime = false;
            }
        };
        // 下单按钮时间
        $scope.orderDetail = () => {
            if (!$scope.noSelectTime) {
                if (!ToolService.checkLogin()) {
                    ToolService.comfirm("请先登录并完善个人信息", function () {
                        $rootScope.messageTip.has = false;
                        ToolService.changeRoute("/login");
                    });
                }
                else if (!ToolService.infoComplete()) {
                    ToolService.comfirm("请完善个人信息!", function () {
                        $rootScope.messageTip.has = false;
                        ToolService.changeRoute("/user/userinfo");
                    });
                }
                else {
                    ToolService.loadUser();
                    var params = {
                        productId: $scope.order.productId
                    };
                    if ($scope.order.code) {
                        params.code = $scope.order.code;
                    }
                    ;
                    if ($scope.order.discountid) {
                        params.discountid = $scope.order.discountid;
                    }
                    ;
                    AjaxService.post({
                        url: ToolService.host + "/wx/order/checkCodeMoney",
                        data: params,
                        headers: {
                            "accessToken": ToolService.user.accessToken
                        }
                    }).then(function (data) {
                        $scope.order.dealMoney = data.dealMoney;
                        $scope.order.payMoney = data.payMoney;
                        $scope.order.realMoney = data.realMoney;
                        $scope.order.giftMoney = data.giftMoney;
                        if (parseFloat($scope.order.giftMoney) <= 0 && $scope.order.flag != 11) {
                            $scope.order.flag = null;
                        }
                        ToolService.setSession("makeorder", $scope.order);
                        ToolService.changeRoute("/makeorder");
                    });
                }
            }
        };
        // 修改项目信息
        $scope.mergeProdcut = (data) => {
            if (data.priceunit != null && data.priceunit != "") {
                data.preferPriceType = data.pricetype + "/" + data.priceunit;
            }
            else {
                data.preferPriceType = data.pricetype;
            }
            if ($location.search().money) {
                data.preferPrice = $location.search().money;
            }
        };
        // 截取排班参数
        $scope.mergeSchedule = (items) => {
            for (var Itemindex = 0; Itemindex < items.length; Itemindex++) {
                var item = items[Itemindex];
                for (var Timeindex = 0; Timeindex < item.length; Timeindex++) {
                    var time = item.timeList[Timeindex];
                    if (Itemindex == 0 && Timeindex == 0) {
                        $scope.scheduleParams[time.scheduleid] = {
                            has: true,
                            value: time.date,
                        };
                    }
                    else {
                        $scope.scheduleParams[time.scheduleid] = {
                            has: false,
                            value: time.date,
                        };
                    }
                }
            }
        };
        // 改变就医时间的选取值
        $scope.mergeDocSelect = (docId, value) => {
            $scope.doctorInfo.forEach((item) => {
                if (item.id == docId) {
                    item.selectTimeValue = value;
                    item.hasSelecTimeValue = true;
                }
                else {
                    item.selectTimeValue = "请选择";
                    item.hasSelecTimeValue = false;
                }
            });
        };
        // 关注按钮处理函数
        $scope.switchFollow = () => {
            if (!ToolService.checkLogin()) {
                ToolService.comfirm("请先登录!", function () {
                    $rootScope.messageTip.has = false;
                    ToolService.changeRoute("/login");
                });
            }
            else {
                ToolService.loadUser();
                if ($scope.follow.hasFollow) {
                    $scope.cacelFollow();
                }
                else {
                    $scope.tofollow();
                }
            }
        };
        // 关注项目
        $scope.tofollow = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/post/focus",
                data: { flag: 3, userId: $scope.proId },
                headers: {
                    'accessToken': ToolService.user.accessToken,
                }
            }).then((data) => {
                if (data.code == 0) {
                    $scope.follow.hasFollow = true;
                    $scope.follow.followText = "已关注";
                }
                else {
                    ToolService.alert("关注失败，稍后再试!");
                }
            });
        };
        // 取消关注项目
        $scope.cacelFollow = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/post/cacelFocus",
                data: { flag: 3, userId: $scope.proId },
                headers: {
                    'accessToken': ToolService.user.accessToken,
                }
            }).then((data) => {
                if (data.code == 0) {
                    $scope.follow.hasFollow = false;
                    $scope.follow.followText = "关注";
                }
                else {
                    ToolService.alert("取消关注失败，稍后再试!");
                }
            });
        };
        // 初始化页面
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
        loadQueryParams();
        $scope.order.hospitalId = $scope.hosId;
        $scope.order.productId = $scope.proId;
        queryProduct();
        queryProductImg();
        queryHospitalImg();
        queryDoctor();
        queryHospital();
    }
    return productDetail;
});
//# sourceMappingURL=productDetail.js.map