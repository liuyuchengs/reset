define(["require", "exports"], function (require, exports) {
    "use strict";
    function order($scope, $rootScope, $location, AjaxService, ToolService) {
        $scope.orders;
        $scope.cancelOrderId;
        $scope.noOrder = false;
        $scope.status = "";
        $scope.btnParams = {
            toPay: false,
            payed: false,
            canceled: false,
            tocancel: false,
            finish: false,
        };
        $scope.filterParams = [
            { has: false, val: "全部", id: "" },
            { has: false, val: "待付款", id: 0 },
            { has: false, val: "待就医", id: 2 },
            { has: false, val: "待评价", id: 4 },
        ];
        // 获取查询参数
        var getParams = function () {
            if ($location.search().p) {
                var params = $location.search().p;
                var index = null;
                switch (params) {
                    case "all":
                        index = 0;
                        break;
                    case "toPay":
                        index = 1;
                        break;
                    case "toHos":
                        index = 2;
                        break;
                    case "toAssess":
                        index = 3;
                        break;
                }
                $scope.filterParams[index].has = true;
                $scope.status = $scope.filterParams[index].id;
            }
        };
        // 加载订单数据
        var loadOrder = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/order/queryOrderList",
                data: { userId: ToolService.user.id, status: $scope.status },
                headers: {
                    accessToken: ToolService.user.accessToken
                }
            }).then(function (data) {
                if (data.code == 0) {
                    if (data.data.length == 0) {
                        $scope.noOrder = true;
                    }
                    else {
                        $scope.noOrder = false;
                        merge(data.data);
                    }
                    $scope.orders = data.data;
                }
                else if (data.code == 1) {
                    ToolService.alert(data.message);
                }
                else {
                    ToolService.alert("获取订单信息失败，请稍后再试!");
                }
            });
        };
        // 根据订单状态码，生成对应的状态信息,如支付中...
        var merge = function (orders) {
            orders.forEach(function (item, index, array) {
                item.toPay = false;
                item.payed = false;
                item.canceled = false;
                item.tocancel = false;
                item.finish = false;
                switch (item.status) {
                    case -1:
                        item.statusMes = "已取消";
                        item.canceled = true;
                        break;
                    case 0:
                        item.statusMes = "待支付";
                        item.toPay = true;
                        item.tocancel = true;
                        break;
                    case 1:
                        item.statusMes = "待确认";
                        item.payed = true;
                        item.tocancel = true;
                        break;
                    case 2:
                        item.statusMes = "待就医";
                        item.payed = true;
                        item.tocancel = true;
                        break;
                    case 3:
                        item.statusMes = "就医中";
                        item.payed = true;
                        break;
                    case 4:
                        item.statusMes = "就医完成";
                        item.finish = true;
                        break;
                    case 5:
                        item.statusMes = "就医完成";
                        item.finish = true;
                        break;
                    case 6:
                        item.statusMes = "退款中";
                        break;
                    case 7:
                        item.statusMes = "退款完成";
                        item.finish = true;
                        break;
                }
                item.discountprice = parseFloat(item.discountprice).toFixed(2);
            });
        };
        // 支付订单
        $scope.toPay = function (order) {
            ToolService.setSession("order", order);
            var appid = "wx0229404bc9eeea00";
            var redirect_uri = ToolService.host + "/v2/htmls/temp.html";
            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_base&state=uokang#wechat_redirect";
            ToolService.toUrl(url);
        };
        // 取消订单
        $scope.toCancel = function (id) {
            $scope.cancelOrderId = id;
            ToolService.comfirm("确定要取消订单吗？", cancelFn);
        };
        // 取消订单提示框，确认按钮回调
        var cancelFn = function () {
            $rootScope.messageTip.has = false;
            AjaxService.post({
                url: ToolService.host + "/wx/order/orderCacel",
                data: { id: $scope.cancelOrderId },
                headers: {
                    accessToken: ToolService.user.accessToken,
                }
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.status = "";
                    loadOrder();
                }
                else if (data.code == 1) {
                    ToolService.alert("订单取消失败，请稍后再试!");
                }
            });
        };
        // 切换导航条
        $scope.switchOrder = function (index) {
            ToolService.select(index, $scope.filterParams);
            $scope.status = $scope.filterParams[index].id;
            loadOrder();
        };
        //初始化页面
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
        if (ToolService.checkLogin()) {
            ToolService.loadUser();
            getParams();
            loadOrder();
        }
        else {
            ToolService.changeRoute("/user");
        }
    }
    return order;
});
//# sourceMappingURL=order.js.map