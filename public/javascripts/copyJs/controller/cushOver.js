define(function(){
	return function($scope,$rootScope,Tool,Ajax){
		$scope.userId;
		$scope.accessToken;
		$scope.cushs;
		$scope.noCushOver = false;

		// 初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
				$scope.loadCushOver();
			}else{
				Tool.changeRoute("/user");
			}
		}

		// 加载过期代金券信息
		$scope.loadCushOver = function(){
			Ajax.post({
				url:Tool.host+"/wx/order/overdue",
				params:{userId:Tool.userInfo.id},
				headers:{
					'accessToken':Tool.userInfo.accessToken
				}
			}).then(function(data){
				if(data.code==0){
					if(data.data.length<1){
						$scope.noCushOver = true;
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

		// 判断代金券是过期还是已使用
		$scope.merge = function(items){
			items.forEach(function(item,index,array){
				if(item.state==1){
					item.mess="已使用";
				}else if(item.state==3){
					item.mess="已过期";
				}
			})
		}
	}
})
