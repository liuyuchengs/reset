"use strict";
function cushOver($scope, $rootScope, ToolService, AjaxService) {
    $scope.userId;
    $scope.accessToken;
    $scope.cushs;
    $scope.noCushOver = false;
    // 加载过期代金券信息
    let loadCushOver = function () {
        AjaxService.post({
            url: ToolService.host + "/wx/order/overdue",
            data: { userId: ToolService.user.id },
            headers: {
                accessToken: ToolService.user.accessToken
            }
        }).then((data) => {
            if (data.code == 0) {
                if (data.data.length < 1) {
                    $scope.noCushOver = true;
                }
                else {
                    merge(data.data);
                    $scope.cushs = data.data;
                }
            }
            else {
                ToolService.alert("数据加载失败，请稍后再试!");
            }
        });
    };
    // 判断代金券是过期还是已使用
    let merge = (items) => {
        items.forEach(function (item) {
            if (item.state == 1) {
                item.mess = "已使用";
            }
            else if (item.state == 3) {
                item.mess = "已过期";
            }
        });
    };
    //页面初始化
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = true;
    if (ToolService.checkLogin()) {
        ToolService.loadUser();
        loadCushOver();
    }
    else {
        ToolService.changeRoute("/user");
    }
}
module.exports = cushOver;
//# sourceMappingURL=cushOver.js.map