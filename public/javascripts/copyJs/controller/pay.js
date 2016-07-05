define(function(){
	return function($scope,$rootScope,$location,Tool,Weixin){
		$scope.code=null;
		$scope.order = null;

		// 初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = false;
			Tool.noWindowListen();
			$scope.getParams();
			Weixin.wxInit($scope);
			Weixin.wxConfig($scope);
		}

		// 获取code和订单信息
		$scope.getParams = function(){
			if($location.search().code){
				$scope.code = $location.search().code;
			}
			if(Tool.getSession("order")){
				$scope.order = Tool.getSession("order");
			}else{
				Tool.changeRoute("/home");
			}
		}

		// 发起请求支付
		$scope.pay = function(){
			Weixin.wxPay($scope.order.id,$scope.code);
		}
	}
})