define(["require", "exports"], function (require, exports) {
    "use strict";
    function doctor($scope, $rootScope, ToolService, AjaxService) {
        $scope.doctors = [];
        $scope.orderParams = ToolService.doctorOrderParams;
        $scope.areaParams = ToolService.areaParams;
        $scope.professionalParams = ToolService.professionalParams;
        $scope.menuParams = [
            { has: false, val: "专科" },
            { has: false, val: "区域" },
            { has: false, val: "排序" }
        ];
        //查询参数
        var queryParams = {
            professionId: "",
            itemid: "",
            orderby: "",
            city: "深圳",
            area: "",
            pageRows: 10,
            currentPage: 1
        };
        // 加载医生数据
        var loadDoctor = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/doctor/querydoctorbycityandprofession",
                data: queryParams
            }).then(function (data) {
                if (data.data.length < 1) {
                    if ($scope.doctors.length < 1) {
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }
                    else {
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }
                else {
                    mergeDoctor(data.data);
                    $scope.doctors = $scope.doctors.concat(data.data);
                }
            }).catch(function () {
                ToolService.alert("数据加载失败");
            }).finally(function () {
                $rootScope.load.has = false;
            });
        };
        // 处理医生数据
        var mergeDoctor = function (items) {
            items.forEach(function (item) {
                if (item.score == "" || item.score == null) {
                    item.score = "暂无评";
                }
                if (item.sales == "" || item.sales == null) {
                    item.sales = 0;
                }
            });
        };
        // 加载下一页数据
        var loadNext = function () {
            queryParams.currentPage++;
            loadDoctor();
        };
        // 跳转到详情页面
        $scope.detail = function (id) {
            ToolService.changeRoute("/doctor/detail", "id=" + id);
        };
        //页面初始化
        $rootScope.followTip.has = false;
        $rootScope.followTip.val = null;
        $rootScope.globalProp.hasBgColor = true;
        ToolService.onWindowListen(loadNext);
    }
    return doctor;
});
