define(function(){
	return function($scope,$rootScope,Tool,Ajax){
		$scope.hasCheck = false;
		$scope.hasGift = false;
		$scope.noUserInfo = true;
		$scope.giftText = "本订单无可用代金券";
		$scope.orderInfo = Tool.getSession("makeorder");
		$scope.orderInfo.patientName = Tool.getLocal("user").realname;
		$scope.orderInfo.patientTelephone = Tool.getLocal("user").phone;
		$scope.userInfo;
		$scope.hasDoctor = true;

		// 页面初始化
		$scope.init = function(){
			$rootScope.hasBgColor = false;
			Tool.noWindowListen();
			Tool.loadUserinfo();
			$scope.checkGift();
		}

		// 是否使用代金券
		$scope.selectCush = function(){
			if($scope.hasGift){
				$scope.hasCheck = !$scope.hasCheck;
				var payMoney = parseFloat($scope.orderInfo.payMoney);
				var giftMoney = parseFloat($scope.orderInfo.giftMoney);
				if($scope.hasCheck){
					$scope.orderInfo.payMoney = payMoney - giftMoney;
				}else{
					$scope.orderInfo.payMoney = payMoney + giftMoney;
					$scope.orderInfo.flag=null;
				}
				$scope.orderInfo.payMoney.toFixed(1);
			}
		}

		// 判定是否有代金券可用
		$scope.checkGift = function(){
			if(parseFloat($scope.orderInfo.giftMoney)>0){
				$scope.hasCheck = true;
				$scope.hasGift = true;
				$scope.giftText = "本订单可使用代金券￥";
			}
			if($scope.orderInfo.doctorName==""||$scope.orderInfo.doctorName==null){
				$scope.hasDoctor = false;
			}
		}

		// 下单按钮
		$scope.makeorder = function(){
			var params = {
				productId: $scope.orderInfo.productId,
				scheduleId: $scope.orderInfo.scheduleId,
				patientName: $scope.orderInfo.patientName,
				patientTelephone: $scope.orderInfo.patientTelephone,
				dealMoney:$scope.orderInfo.dealMoney,
				realMoney:$scope.orderInfo.realMoney,
				payMoney:$scope.orderInfo.payMoney,
			}
			//特惠专区传入任意code
			if($scope.orderInfo.code){
				params.code = $scope.orderInfo.code;
			}
			//使用代金券flag=1,不使用不传入flag
			if($scope.orderInfo.flag){
				params.flag = $scope.orderInfo.flag;
			}
			Ajax.post({
				url:Tool.host+"/wx/order/make",
				params:params,
				headers:{
					'accessToken':Tool.userInfo.accessToken
				}
			}).then(function(data){
				if(data.code==0){
					Tool.removeSession("makeorder");
					Tool.setSession("order",data.data);
					var appid = "wx0229404bc9eeea00";
					var redirect_uri = Tool.host+"/v2/htmls/temp.html";
					var href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=uokang#wechat_redirect";
					Tool.goUrl(href);
				}else{
					Tool.alert(data.message);
				}
			}).catch(function(){
				Tool.alert("创建订单失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 返回按钮
		$scope.back = function(){
			window.history.back();
		}
	}
})