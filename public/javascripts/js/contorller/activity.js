define(["require", "exports"], function (require, exports) {
    "use strict";
    function activity($scope, $rootScope, $location, ToolService, AjaxService) {
        $scope.queryParams = {
            pageRows: 10,
            currentPage: 1,
            flag: null,
        };
        $scope.noProduct = false;
        $scope.noProductText = "";
        $scope.products = [];
        //页面初始化
        $scope.init = function () {
            $rootScope.hasBgColor = false;
            if ($location.search().flag) {
                $scope.queryParams.flag =
                ;
            }
        };
    }
    return activity;
});
