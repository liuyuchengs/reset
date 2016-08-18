"use strict";
function grabOrder($scope, $rootScope, ToolService, AjaxService) {
    $scope.hasGift = false;
    $scope.gift = {};
    // 查询惠赠订单
    let queryGift = () => {
        AjaxService.get({
            url: ToolService.host + "/wx/order/queryUserGiftCode",
            headers: {
                accessToken: ToolService.user.accessToken,
            }
        }).then((data) => {
            if (data.code == 0) {
                if (data.data.length > 0) {
                    $scope.gift = data.data[0];
                    $scope.hasGift = true;
                }
            }
        });
    };
    // 初始化页面
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = true;
    if (ToolService.checkLogin()) {
        ToolService.loadUser();
        queryGift();
    }
    else {
        ToolService.changeRoute("/user");
    }
}
module.exports = grabOrder;
//# sourceMappingURL=grabOrder.js.map