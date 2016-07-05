define(function(){
	return function($scope,$rootScope,Tool,Ajax){
		$scope.phone;
		$scope.realname;
		$scope.sex;
		$scope.age;
		$scope.nickname;
		$scope.email;

		//页面初始化
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
				Ajax.post({
					url:Tool.host+"/wx/mycount/getUserByToken",
					params:null,
					headers:{
						"accessToken":Tool.userInfo.accessToken
					}
				}).then(function(data){
					Tool.setLocal("user",data.data);
					var user = data.data;
					$scope.phone = user.phone || "";
					$scope.realname = user.realname || "";
					$scope.sex = user.sex || "";
					$scope.age = user.age || "";
					$scope.nickname = user.nickname || "";
					$scope.email = "";
					$scope.face = user.face;
					$scope.wxpay = user.wxpay;
					$scope.alipay = user.alipay;
				}).catch(function(){
					Tool.alert("获取用户信息失败，请稍后再试!");
				}).finally(function(){
					$rootScope.loading = false;
				})	
			}else{
				Tool.changeRoute("/user");
			}	
		}

		// 退出登录
		$scope.exit = function(){
			Tool.clearLocal();
			Tool.changeRoute("/user");
		}

		// 跳转到修改账户信息页面
		$scope.change = function(item){
			var state;
			if(item==="wxpay"){
				if(Tool.userInfo.wxpay===null||Tool.userInfo.wxpay===""){
					state = 2;
				}else{
					state = 1;
				}
				Tool.changeRoute("/user/userinfochange","item="+item+"&state="+state);
			}else if(item==="alipay"){
				if(Tool.userInfo.alipay===null||Tool.userInfo.alipay===""){
					state = 2;
				}else{
					state =1;
				}
				Tool.changeRoute("/user/userinfochange","item="+item+"&state="+state);
			}else{
				Tool.changeRoute("/user/userinfochange","item="+item);
			}
			
		}
	}
})
