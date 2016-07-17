define(["require", "exports"], function (require, exports) {
    "use strict";
    function newsDetail($scope, $rootScope, $location, AjaxService, ToolService) {
        $scope.detail = {};
        $scope.id = null;
        //加载资讯信息
        var loadDetail = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/health/querydetail",
                data: { id: $scope.id },
            }).then(function (data) {
                if (data.code == 0) {
                    data.data.content = $scope.mergeDetail(data.data.content);
                    $scope.detail = data.data;
                }
                else {
                    ToolService.alert("查询数据失败，请稍后再试!");
                }
            });
        };
        /**
         * 对资讯信息进行排版
         */
        var mergeDetail = function (str) {
            var arrayStr = str.split("\r\n");
            if (arrayStr.length > 0) {
                for (var index in arrayStr) {
                    arrayStr[index] = arrayStr[index].trim();
                }
            }
            else {
                arrayStr = str;
            }
            return arrayStr;
        };
        //初始化页面
        ToolService.reset();
        if ($location.search().id) {
            $scope.id = $location.search().id;
            loadDetail();
        }
        else {
            ToolService.changeRoute("/home");
        }
    }
    return newsDetail;
});
//# sourceMappingURL=newsDetail.js.map