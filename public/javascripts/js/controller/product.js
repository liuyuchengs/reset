define(["require", "exports"], function (require, exports) {
    "use strict";
    function product($scope, $rootScope, $location, ToolService, AjaxService) {
        //查询条件
        $scope.queryParams = {
            city: "深圳",
            area: "",
            professionId: "",
            itemId: "",
            order: "",
            currentPage: 1,
            pageRows: 10,
            location: "",
        };
        $scope.hasLocation = false;
        //菜单项变量
        $scope.orderParams = ToolService.orderParams;
        $scope.areaParams = ToolService.areaParams;
        $scope.classParams = {};
        $scope.menuParams = [
            { has: false, val: "区域", children: $scope.areaParams },
            { has: false, val: "排序", children: $scope.orderParams },
            { has: false, val: "分类", children: {} },
        ];
        $scope.productParams = {
            yake: { has: false, val: "牙科", id: 2 },
            meirong: { has: false, val: "医学美容", id: 3 },
            fck: { has: false, val: "高端妇产科", id: 4 },
            zhongyi: { has: false, val: "中医理疗", id: 6 }
        };
        $scope.title = "";
        $scope.products = [];
        // 加载地理信息
        var initLocation = function () {
            if (ToolService.getSession("locationInfo")) {
                $scope.hasLocation = true;
            }
        };
        // 加载分类信息
        var loadClassParams = function () {
            if ($location.search().product) {
                var product = $location.search().product;
                $scope.productParams[product].has = true;
                $scope.title = $scope.productParams[product].val;
                $scope.queryParams.professionId = $scope.productParams[product].id;
                switch (product) {
                    case "yake":
                        $scope.classParams = ToolService.yakeParams;
                        break;
                    case "meirong":
                        $scope.classParams = ToolService.meirongParams;
                        break;
                    case "fck":
                        $scope.classParams = ToolService.fckParams;
                        break;
                    case "zhongyi":
                        $scope.classParams = ToolService.zhongyiParams;
                        break;
                    default:
                        $scope.classParams = {};
                }
            }
            else {
                ToolService.changeRoute("/home");
            }
        };
        // 下拉菜单切换
        $scope.switchMenu = function (index, obj) {
            ToolService.select(index, obj, true);
            $rootScope.globalProp.hasBlackBg = obj[index].has;
        };
        //下拉菜单项切换
        $scope.switchDrop = function (index, obj) {
            ToolService.select(index, obj);
            if (obj === $scope.areaParams) {
                $scope.queryParams.area = obj[index].id;
                $scope.menuParams[0].has = false;
            }
            if (obj === $scope.orderParams) {
                $scope.queryParams.order = obj[index].id;
                $scope.menuParams[1].has = false;
            }
            if (obj === $scope.classParams) {
                $scope.queryParams.itemId = obj[index].id;
                $scope.menuParams[2].has = false;
            }
            $scope.products = [];
            $scope.queryParams.currentPage = 1;
            $rootScope.followTip.has = false;
            $rootScope.globalProp.hasBlackBg = false;
            loadData();
        };
        // 查询数据
        var loadData = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/product/querylist",
                data: $scope.queryParams
            }).then(function (data) {
                if (data.length < 1) {
                    if ($scope.products.length < 1) {
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }
                    else {
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }
                else {
                    mergeProdcut(data);
                    $scope.products = $scope.products.concat(data);
                }
            });
        };
        //处理项目信息
        var mergeProdcut = function (items) {
            items.forEach(function (item) {
                if (item.priceunit != null && item.priceunit != "") {
                    item.preferPriceType = item.pricetype + "/" + item.priceunit;
                }
                else {
                    item.preferPriceType = item.pricetype;
                }
            });
        };
        // 跳转到详细页面
        $scope.detail = function (productId, hospitalId) {
            ToolService.changeRoute("/product/detail", "flag=1&productId=" + productId + "&hospitalId=" + hospitalId);
        };
        // 疑问按钮处理函数
        $scope.question = function () {
            ToolService.alert("如有疑问，请致电0755-26905699");
        };
        //初始化
        ToolService.reset();
        loadClassParams();
        initLocation();
        loadData();
        ToolService.onWindowListen(function () {
            $scope.queryParams.currentPage++;
            loadData();
        });
    }
    return product;
});
