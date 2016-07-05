define(function(){
	return function($scope,$rootScope,$location,Ajax,Tool){
		$scope.orders;
		$scope.cancelOrderId;
		$scope.noOrder = false;
		$scope.status = "";
		$scope.btnParams = {
			toPay:false,
			payed:false,
			canceled:false,
			tocancel:false,
			finish:false,
		}
		$scope.filterParams = {
			all:{has:false,val:""},
			toPay:{has:false,val:"0"},
			toHos:{has:false,val:"2"},
			toAssess:{has:false,val:"4"}
		}

		//初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
				$scope.getParams();
				$scope.loadOrder();
			}else{
				Tool.changeRoute("/user");
			}
		}

		// 获取查询参数
		$scope.getParams = function(){
			if($location.search().p){
				var params = $location.search().p;
				$scope.filterParams[params].has=true;
				$scope.status = $scope.filterParams[params].val;
			}
		}

		// 加载订单数据
		$scope.loadOrder = function(){
			Ajax.post({
				url:Tool.host+"/wx/order/queryOrderList",
				params:{userId:Tool.userInfo.id,status:$scope.status},
				headers:{
					'accessToken':Tool.userInfo.accessToken
				}
			}).then(function(data){
				if(data.code==0){
					if(data.data.length==0){
						$scope.noOrder=true;
					}else{
						$scope.noOrder = false;
						$scope.merge(data.data);
					}
					$scope.orders = data.data;
				}else if(data.code==1){
					Tool.alert(data.message);
				}else{
					Tool.alert("获取订单信息失败，请稍后再试!");
				}
			}).catch(function(){
				Tool.alert("获取订单信息失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading=false;
			})
		}

		// 根据订单状态码，生成对应的状态信息,如支付中...
		$scope.merge = function(orders){
			orders.forEach(function(item,index,array){
				item.toPay = false;
				item.payed = false;
				item.canceled = false;
				item.tocancel = false;
				item.finish = false;
				switch(item.status){
					case -1:
						item.statusMes = "已取消";
						item.canceled = true;
						break;
					case 0:
						item.statusMes = "待支付";
						item.toPay = true;
						item.tocancel = true;
						break;
					case 1:
						item.statusMes = "待确认";
						item.payed = true;
						item.tocancel = true;
						break;
					case 2:
						item.statusMes = "待就医";
						item.payed = true;
						item.tocancel = true;
						break;
					case 3:
						item.statusMes = "就医中";
						item.payed = true;
						break;
					case 4:
						item.statusMes = "就医完成";
						item.finish = true;
						break;
					case 5:
						item.statusMes = "就医完成";
						item.finish = true;
						break;
					case 6:
						item.statusMes = "退款中";
						break;
					case 7:
						item.statusMes = "退款完成";
						item.finish = true;
						break;
				}
				item.discountprice = parseFloat(item.discountprice).toFixed(2);
			});
		}

		// 支付订单
		$scope.toPay = function(order){
			Tool.setSession("order",order);
			var appid = "wx0229404bc9eeea00";
			var redirect_uri = Tool.host+"/v2/htmls/temp.html";
			var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=uokang#wechat_redirect";
			Tool.goUrl(url);
		}

		// 取消订单
		$scope.toCancel = function(id){
			$scope.cancelOrderId = id;
			Tool.comfirm("确定要取消订单吗？",$scope.cancelFn);
		}

		// 取消订单提示框，确认按钮回调
		$scope.cancelFn =function(){
			if($rootScope.hasTip){
				$rootScope.hasTip = false;
			}
			Ajax.post({
				url:Tool.host+"/wx/order/orderCacel",
				params:{id:$scope.cancelOrderId},
				headers:{
					'accessToken':Tool.userInfo.accessToken,
				}
			}).then(function(data){
				if(data.code==0){
					$scope.status = "";
					$scope.loadOrder();
				}else if(data.code==1){
					Tool.alert("订单取消失败，请稍后再试!");
				}
			}).catch(function(){
				Tool.alert("订单取消失败!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 切换导航条
		$scope.switchOrder = function(item){
			Tool.select(item,$scope.filterParams);
			$scope.status = $scope.filterParams[item].val;
			$scope.loadOrder();
		}

	}
})
