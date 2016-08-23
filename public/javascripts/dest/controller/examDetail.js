define(["require", "exports"], function (require, exports) {
    "use strict";
    function examDetail($scope, $rootScope, $location, ToolService, AjaxService) {
        $scope.productId = null;
        $scope.hospitalId = null;
        $scope.product = null;
        $scope.productItem = [];
        $scope.schedules = [];
        $scope.hospital = null;
        $scope.hospitalImg = null;
        $scope.noSchedule = false;
        $scope.noSelectTime = false;
        $scope.scheduleParams = {};
        $scope.filterParams = [
            { has: true, val: "套餐详情" },
            { has: false, val: "医院详情" },
            { has: false, val: "须知" },
        ];
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
        // 切换导航条
        $scope.switch = (index, obj) => {
            ToolService.select(index, obj);
        };
        // 返回上一页
        $scope.back = function () {
            window.history.back();
        };
        // 获取url参数
        let loadParams = () => {
            if ($location.search().productId) {
                $scope.productId = $location.search().productId;
                $scope.order.productId = $scope.productId;
            }
            if ($location.search().hospitalId) {
                $scope.hospitalId = $location.search().hospitalId;
                $scope.order.hospitalId = $scope.hospitalId;
            }
        };
        // 加载排班信息
        let loadSchedule = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/schedule/querybyhospitalid",
                data: { hospitalId: $scope.hospitalId },
            }).then((data) => {
                if (data.length > 0) {
                    mergeSchedule(data);
                    $scope.schedules = data;
                }
                else {
                    $scope.noSchedule = true;
                }
            });
        };
        // 保存排班信息
        let mergeSchedule = (items) => {
            for (var index = 0; index > items.length; index++) {
                var item = items[index];
                if (index == 0) {
                    $scope.scheduleParams[item.scheduleid] = {
                        has: true,
                        val: item.dateStr,
                    };
                    $scope.order.treatmentTime = item.dateStr;
                    $scope.order.scheduleId = item.scheduleid;
                }
                else {
                    $scope.scheduleParams[item.scheduleid] = {
                        has: false,
                        val: item.dateStr,
                    };
                }
            }
        };
        // 加载体检套餐信息
        let loadProduct = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/product/packagedetal",
                data: { packageid: $scope.productId },
            }).then((data) => {
                if (data.code == 0) {
                    mergeProduct(data.data);
                    $scope.product = data.data;
                    $scope.order.productName = $scope.product.title;
                    $scope.order.preferPrice = $scope.product.preferPrice + $scope.product.preferPriceType;
                }
                else {
                    ToolService.alert("加载套餐信息失败，请稍后再试!");
                }
            });
        };
        // 处理套餐信息
        let mergeProduct = (item) => {
            if (item.priceunit != null && item.priceunit != "") {
                item.preferPriceType = item.pricetype + "/" + item.priceunit;
            }
            else {
                item.preferPriceType = item.pricetype;
            }
            if (item.smallImg == "" || item.smallImg == null) {
                item.smallImg = "../contents/img/p_default.png";
            }
        };
        // 加载体检套餐的项目信息
        let loadProductItem = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/product/packagedetalItem",
                data: { packageid: $scope.productId },
            }).then((data) => {
                $scope.productItem = data;
            });
        };
        // 加载医院信息
        let loadHospital = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/product/hospitalbyid",
                data: { id: $scope.hospitalId },
            }).then((data) => {
                if (data.code == 0) {
                    $scope.hospital = data.data;
                    $scope.order.hospitalAddress = $scope.hospital.address;
                    $scope.order.hospitalName = $scope.hospital.name;
                }
            });
        };
        // 加载医院图片
        let loadHopitalImg = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/image/querybymainid",
                data: { type: "HOSPITAL", mainId: $scope.hospitalId },
            }).then((data) => {
                if (data[0].url == "" || data[0].url == null) {
                    data[0].url = "../contents/img/p_default.png";
                }
                $scope.hospitalImg = data[0].url;
            });
        };
        // 打开选择时间按钮
        $scope.selectTimeBtn = () => {
            if (!$scope.noSchedule) {
                $scope.hasSelectTime = true;
            }
        };
        // 取消选择时间
        $scope.cancelTime = () => {
            $scope.hasSelectTime = false;
        };
        // 选择时间
        $scope.selectTime = (id) => {
            if (!$scope.noSchedule) {
                ToolService.select(id, $scope.scheduleParams);
                $scope.order.treatmentTime = $scope.scheduleParams[id].val;
                $scope.order.scheduleId = id;
            }
        };
        // 跳转到详细页面
        $scope.detail = () => {
            if (!ToolService.checkLogin()) {
                ToolService.comfirm("请先登录并完善个人信息!", function () {
                    $rootScope.followTip.has = false;
                    ToolService.changeRoute("/login");
                });
            }
            else if (!ToolService.infoComplete()) {
                ToolService.comfirm("请完善个人信息!", function () {
                    $rootScope.followTip.has = false;
                    ToolService.changeRoute("/user/userinfo");
                });
            }
            else {
                ToolService.loadUser();
                AjaxService.post({
                    url: ToolService.host + "/wx/order/checkCodeMoney",
                    data: { productId: $scope.order.productId },
                    headers: {
                        "accessToken": ToolService.user.accessToken
                    }
                }).then((data) => {
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
        };
        ToolService.reset();
        loadParams();
        loadProduct();
        loadHospital();
        loadHopitalImg();
        loadProductItem();
        loadSchedule();
    }
    return examDetail;
});
//# sourceMappingURL=examDetail.js.map