define(function(){
	return function($scope,$rootScope,$location,Ajax,Tool){
		$scope.phone = "" ;
		$scope.password = "";
		
		//初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = false;
			Tool.noWindowListen();
		}

		// 登陆
		$scope.login=function(){
			if($scope.check()){
				var data = {phone:$scope.phone,password:$scope.password};
				Ajax.post({
					url:Tool.host+"/wx/login/wxlogin",
					params:data,
				}).then(function(data){
					if(data.code==0){
						Tool.setLocal("user",data.data);
						$location.path("/user");
					}else if(data.code==1){
						Tool.alert("账号或者密码错误,请重新输入");
					}else{
						Tool.alert("未知错误!");
					}
				}).catch(function(){
					Tool.alert("登录错误，请稍后再试！");
				}).finally(function(){
					$rootScope.loading = false;
				})
			}else{
				Tool.alert("请检查手机号码或者密码长度符合要求！");
			}
		}

		// 检查信息是否符合要求
		$scope.check = function(){
			if(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone)&&$scope.password.length>=8&&$scope.password.length<=20){
				return true;
			}else{
				return false;
			}
		}
	}
})
