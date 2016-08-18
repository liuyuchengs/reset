"use strict";
function payMoney($scope, $rootScope, ToolService, AjaxService) {
    $scope.showPay = false;
    $scope.money = {
        dealMoney: null,
        balance: null,
    };
    //显示支付
    $scope.choosePay = () => {
        if ($scope.money.balance > 0) {
            $scope.showPay = true;
        }
        else {
            ToolService.alert("没有可提取余额!");
        }
    };
    //隐藏支付
    $scope.hiddenPay = () => {
        $scope.showPay = false;
    };
    //查询提现金额
    let queryMoney = () => {
        AjaxService.post({
            url: ToolService.host + "/wx/withDraw/myMoney",
            data: { "accessToken": ToolService.user.accessToken },
        }).then(function (data) {
            if (data.code == 0) {
                $scope.money = data.data;
            }
            else {
                ToolService.alert(data.message);
            }
        });
    };
    //申请提现
    $scope.getMoney = (flag, $event) => {
        $event.stopPropagation();
        if (checkAccount(flag)) {
            AjaxService.post({
                url: ToolService.host + "/wx/withDraw/apply",
                data: { "accessToken": ToolService.user.accessToken, "flag": flag }
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.showPay = false;
                    queryMoney();
                }
            });
        }
        else {
            ToolService.alert("请先绑定微信或者支付宝账号!", function () {
                $rootScope.messageTip.has = false;
                ToolService.changeRoute("/user/userinfo");
            });
        }
    };
    //检查是否有绑定账号
    let checkAccount = (flag) => {
        if (flag == 1 && ToolService.user.alipay != null && ToolService.user.alipay != "") {
            return true;
        }
        else if (flag == 2 && ToolService.user.wxpay != null && ToolService.user.wxpay != "") {
            return true;
        }
        else {
            return false;
        }
    };
    //页面初始化
    ToolService.reset();
    if (ToolService.checkLogin()) {
        ToolService.loadUser();
        queryMoney();
    }
    else {
        ToolService.changeRoute("/user");
    }
}
module.exports = payMoney;
//# sourceMappingURL=payMoney.js.map