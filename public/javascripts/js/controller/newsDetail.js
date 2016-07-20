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
                    data.data.content = mergeDetail(data.data.content);
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
            var sourceArray = str.split("\r\n");
            var destArray = [];
            if (sourceArray.length > 0) {
                for (var index in sourceArray) {
                    if (sourceArray[index].trim().length > 0) {
                        destArray.push(sourceArray[index].trim());
                    }
                }
            }
            else {
                destArray.push(str);
            }
            return destArray;
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
