app.controller("indexCtrl",["$scope","$location",function($scope,$location){

    //导航栏样式参数
    $scope.navMenuParams = {
        home:true,
        doctor:false,
        interaction:false,
        user:false
    }

    //导航栏菜单处理事件
    $scope.menuClick = function(item){
        $location.path(item);
        for(var prototype in $scope.navMenuParams){
            if(prototype ===item){
                $scope.navMenuParams[item] = true;
            }else{
                $scope.navMenuParams[prototype] = false;
            }
        }
    }

}])