define(function(){
	return function($scope,$rootScope,Tool,Ajax){
		$scope.hasGift = false;
		$scope.gift = {};

		// 初始化页面
		$scope.init = function(){
			$rootScope.loading =false;
			Tool.noWindowListen();
			Tool.loadUserinfo();
			$scope.queryGift();
		}

		// 查询惠赠订单
		$scope.queryGift = function(){
			Ajax.get({
				url:Tool.host+"/wx/order/queryUserGiftCode",
				headers:{
					"accessToken":Tool.userInfo.accessToken,
				}
			}).then(function(data){
				if(data.code==0){
					if(data.data.length>0){
						$scope.gift = data.data[0];
						$scope.hasGift = true;
					}
				}
			}).catch(function(){
				Tool.alert("获取惠赠信息失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}
	}
})
