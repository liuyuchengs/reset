"use strict";
function makeorder($scope, $rootScope, ToolService, AjaxService) {
    $scope.hasCheck = false;
    $scope.hasGift = false;
    $scope.noUserInfo = true;
    $scope.giftText = "本订单无可用代金券";
    $scope.orderInfo = null;
    $scope.hasDoctor = true;
    // 是否使用代金券
    $scope.selectCush = () => {
        if ($scope.hasGift) {
            $scope.hasCheck = !$scope.hasCheck;
            var payMoney = parseFloat($scope.orderInfo.payMoney);
            var giftMoney = parseFloat($scope.orderInfo.giftMoney);
            if ($scope.hasCheck) {
                $scope.orderInfo.payMoney = payMoney - giftMoney;
            }
            else {
                $scope.orderInfo.payMoney = payMoney + giftMoney;
                $scope.orderInfo.flag = null;
            }
            $scope.orderInfo.payMoney.toFixed(1);
        }
    };
    // 判定是否有代金券可用
    let checkGift = () => {
        if (parseFloat($scope.orderInfo.giftMoney) > 0) {
            $scope.hasCheck = true;
            $scope.hasGift = true;
            $scope.giftText = "本订单可使用代金券￥";
        }
        if ($scope.orderInfo.doctorName == "" || $scope.orderInfo.doctorName == null) {
            $scope.hasDoctor = false;
        }
    };
    // 下单按钮
    $scope.makeorder = () => {
        var params = {
            productId: $scope.orderInfo.productId,
            scheduleId: $scope.orderInfo.scheduleId,
            patientName: $scope.orderInfo.patientName,
            patientTelephone: $scope.orderInfo.patientTelephone,
            dealMoney: $scope.orderInfo.dealMoney,
            realMoney: $scope.orderInfo.realMoney,
            payMoney: $scope.orderInfo.payMoney,
        };
        //特惠专区传入任意code
        if ($scope.orderInfo.code) {
            params.code = $scope.orderInfo.code;
        }
        //使用代金券flag=1,不使用不传入flag
        if ($scope.orderInfo.flag) {
            params.flag = $scope.orderInfo.flag;
        }
        AjaxService.post({
            url: ToolService.host + "/wx/order/make",
            data: params,
            headers: {
                'accessToken': ToolService.user.accessToken
            }
        }).then((data) => {
            if (data.code == 0) {
                ToolService.removeSession("makeorder");
                ToolService.setSession("order", data.data);
                var appid = "wx0229404bc9eeea00";
                var redirect_uri = ToolService.host + "/v2/htmls/temp.html";
                var href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_base&state=uokang#wechat_redirect";
                ToolService.toUrl(href);
            }
            else {
                ToolService.alert(data.message);
            }
        });
    };
    // 返回按钮
    $scope.back = () => {
        window.history.back();
    };
    // 页面初始化
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = false;
    if (ToolService.checkLogin() && ToolService.getSession("makeorder")) {
        ToolService.loadUser();
        $scope.orderInfo = ToolService.getSession("makeorder");
        $scope.orderInfo.patientName = ToolService.getLocal("user").realname;
        $scope.orderInfo.patientTelephone = ToolService.getLocal("user").phone;
        checkGift();
    }
    else {
        ToolService.changeRoute("/home");
    }
}
module.exports = makeorder;
//# sourceMappingURL=makeorder.js.map