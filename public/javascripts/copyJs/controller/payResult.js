define(function(){
	return function($scope,$rootScope,$location,Tool){
		$scope.payResult = "";
		$scope.hasSuccess = false;
		$scope.resultValue = "";

		// 获取支付结果，初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			if($location.search().payResult){
				$scope.payResult = $location.search().payResult;
			}
			if($scope.payResult=="success"){
				$scope.hasSuccess = true;
				$scope.resultValue = "订单支付成功";
			}else{
				$scope.hasSuccess = false;
				$scope.resultValue = "订单支付失败";
			}
		}

		// 再次支付订单
		$scope.payAgain = function(){
			var appid = "wx0229404bc9eeea00";
			var redirect_uri = Tool.host+"/v2/htmls/temp.html";
			var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=uokang#wechat_redirect";
			Tool.goUrl(url);
		}

		// 去订单管理中查看订单
		$scope.checkOrder = function(){
			Tool.changeRoute("/order");
		}

		// 跳转到主页
		$scope.toHome = function(){
			Tool.changeRoute("/home");
		}
	}
})
