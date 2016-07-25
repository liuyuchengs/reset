define(["require", "exports"], function (require, exports) {
    "use strict";
    function payResult($scope, $rootScope, $location, ToolService) {
        $scope.payResult = "";
        $scope.hasSuccess = false;
        $scope.resultValue = "";
        // 再次支付订单
        $scope.payAgain = function () {
            var appid = "wx0229404bc9eeea00";
            var redirect_uri = ToolService.host + "/mobile/htmls/temp.html";
            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_base&state=uokang#wechat_redirect";
            ToolService.toUrl(url);
        };
        // 去订单管理中查看订单
        $scope.checkOrder = function () {
            ToolService.changeRoute("/order");
        };
        // 跳转到主页
        $scope.toHome = function () {
            ToolService.changeRoute("/home");
        };
        // 获取支付结果，初始化页面
        ToolService.reset();
        $rootScope.globalProp.hasBgColor = true;
        if ($location.search().payResult) {
            $scope.payResult = $location.search().payResult;
        }
        if ($scope.payResult == "success") {
            $scope.hasSuccess = true;
            $scope.resultValue = "订单支付成功";
        }
        else {
            $scope.hasSuccess = false;
            $scope.resultValue = "订单支付失败";
        }
    }
    return payResult;
});
//# sourceMappingURL=payResult.js.map