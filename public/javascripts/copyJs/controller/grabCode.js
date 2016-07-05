define(function(){
	return function($scope,$rootScope,$location,Tool,Ajax){
		$scope.queryParams = {
			productId:"",
			hospitalId:"",
			dayDate:"",
			code:"",
		}
		$scope.userInfo = {};

		// 获取查询字符串参数
		$scope.loadQueryParams = function(){
			if($location.search().productId){
				$scope.queryParams.productId = $location.search().productId;
			}
			if($location.search().hospitalId){
				$scope.queryParams.hospitalId = $location.search().hospitalId;
			}
			if($location.search().dayDate){
				$scope.queryParams.dayDate = $location.search().dayDate;
			}
		}

		// 页面初始化
		angular.element(document).ready(function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			$scope.loadQueryParams();
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
			}
		})

		// 检查可生成惠赠订单
		$scope.checkCode = function(){
			if($scope.queryParams.code.length<1){
				Tool.alert("请填写惠赠码!");
			}else if($scope.queryParams.code.length!=5){
				Tool.alert("惠赠码错误，请填写正确的惠赠码！如需帮助请致电：0755-26905699")
			}else if($scope.queryParams.code.length ==5){
				Ajax.post({
					url:Tool.host+"/wx/order/checkCode",
					params:$scope.queryParams,
					headers:{
						"accessToken":Tool.userInfo.accessToken,
					}
				}).then(function(data){
					if(data.code==0){
						$scope.getGift($scope.queryParams);
					}else{
						Tool.alert(data.message);
					}
				}).catch(function(){
					Tool.alert("数据连接失败，请稍后再试!");
				}).finally(function(){
					$rootScope.loading = false;
				})
			}
		}

		// 生成惠赠订单
		$scope.getGift = function(queryParams){
			Ajax.post({
				url:Tool.host+"/wx/gift/getgiftproduct",
				params:queryParams,
				headers:{
					"accessToken":Tool.userInfo.accessToken,
				}
			}).then(function(data){
				if(data.code ==0){
					var user = Tool.getLocal("user");
					user.giftCode = 0;
					Tool.setLocal("user",user);
					Tool.setLocal("gift",data.data);
					Tool.changeRoute("/grab/order");
				}
			}).catch(function(){
				Tool.alert("连接数据失败，请稍后再试！");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}
	}
})