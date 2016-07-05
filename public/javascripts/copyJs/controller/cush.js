define(function(){
	return function($scope,$rootScope,Tool,Ajax){
		$scope.cushs;
		$scope.noCush = false;
		$scope.activeValue="";

		// 初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
				$scope.loadCush();
			}else{
				Tool.changeRoute("/user");
			}
		}

		// 加载代金券信息
		$scope.loadCush = function(){
			Ajax.post({
				url:Tool.host+"/wx/order/findAllVouchers",
				params:{userId:Tool.userInfo.id},
				headers:{
					'accessToken':Tool.userInfo.accessToken
				}
			}).then(function(data){
				if(data.code==0){
					if(data.data.length==0){
						$scope.noCush = true;
					}else{
						$scope.merge(data.data);
						$scope.cushs = data.data;
					}
				}else{
					Tool.alert("数据加载失败，请稍后再试!");
				}
			}).catch(function(){
				Tool.alert("数据加载失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 判断代金券是否有使用
		$scope.merge = function(items){
			items.forEach(function(item,index,array){
				if(item.flags>item.money){
					item.used = true;
				}else{
					item.uesd = false;
				}
			})
		}

		// 激活代金券
		$scope.active = function(){
			if($scope.activeValue.length==6){
				Ajax.post({
					url:Tool.host+"/wx/order/activate",
					params:{userId:Tool.userInfo.id,code:$scope.activeValue},
					headers:{
						'accessToken':Tool.userInfo.accessToken
					}
				}).then(function(data){
					if(data.code==0){
						$scope.merge(data.data);
						$scope.cushs = data.data;
					}else{
						Tool.alert("代金券不正确!");
					}
				}).catch(function(data){
					Tool.alert("代金券激活失败!");
				}).finally(function(){
					$rootScope.loading = false;
				})
			}else{
				Tool.alert("请输入正确长度的代金券!");
			}
		}

	}
})
