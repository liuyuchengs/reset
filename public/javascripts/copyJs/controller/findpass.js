define(function(){
	return function($scope,$rootScope,$location,$interval,Tool,Ajax){
		$scope.phone = ""; //手机号码
		$scope.code = ""; //验证码
		$scope.pwd = ""; //密码
		$scope.getPhone = $location.search().phone||""; //跳转页面缓存手机号码
		$scope.getCodes = $location.search().code||""; //跳转页面缓存验证码
		$scope.hasSendCode = false; //是否是发送验证码状态
		$scope.codeText = "获取短信验证码";
		$scope.sendCodes = false;
		
		angular.element(document).ready(function(){
			Tool.noWindowListen();
			$rootScope.hasBgColor = true;
		})

		// 检测手机号码是否有注册
		$scope.checkPhone = function(){
			if(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone)){
				Ajax.post({
					url:Tool.host+"/wx/findpass/findPassPhontCheck",
					params:{name:"phone",param:$scope.phone}
				}).then(function(data){
					if(data.code==0){
						Tool.changeRoute("/findpwd/code","phone="+$scope.phone);
					}else{
						Tool.alert(data.message);
					}
				}).catch(function(){
					Tool.alert("检查手机号码失败，请稍后再试!");
				}).finally(function(){
					$rootScope.loading =false;
				})
			}else{
				Tool.alert("请输入正确的手机号码!");
			}		
		}

		// 检测验证码是否正确
		$scope.checkCode = function(){
			if($scope.sendCodes){
				if($scope.code.length==4){
					Ajax.post({
						url:Tool.host+"/wx/findpass/findPassPhontCheck",
						params:{name:"verifyCode",param:$scope.code,p:$scope.getPhone},
					}).then(function(data){
						if(data.code==0){
							Tool.changeRoute("/findpwd/pwd","phone="+$scope.getPhone+"&code="+$scope.code);
						}else{
							Tool.alert(date.message);
						}
					}).catch(function(){
						Tool.alert("验证码错误!");
					}).finally(function(){
						$rootScope.loading =false;
					})
				}else{
					Tool.alert("请输入4位验证码");
				}
			}else{
				Tool.alert("请先获取验证码");
			}
		}

		// 修改密码
		$scope.changePwd = function(){
			if($scope.pwd.length>=8&&$scope.pwd.length<=20){
				Ajax.post({
					url:Tool.host+"/wx/findpass/changepwd",
					params:{phone:$scope.getPhone,code:$scope.getCodes,password:$scope.pwd}
				}).then(function(data){
					if(data.code==0){
						Tool.alert("密码修改成功!",function(){
							$rootScope.hasTip = false;
							Tool.changeRoute("/login");
						})
					}else{
						Tool.alert(data.message);
					}
				}).catch(function(){
					Tool.alert("密码修改失败，请稍后再试!");
				}).finally(function(){
					$rootScope.loading =false;
				})
			}
		}

		// 发送短信验证码
		$scope.getCode = function(){
			if(!$scope.hasSendCode){
				Ajax.post({
					url:Tool.host+"/wx/findpass/sendsmsfindpasscode",
					params:{phone:$scope.getPhone},
				}).then(function(data){
					if(data.code==0){
						$scope.hasSendCode = true;
						$scope.sendCodes = true;
						var time = 59;
						var interval = $interval(function(){
							$scope.codeText = (time+" S");
							time--;
						},1000,60).then(function(){
							$scope.codeText = "获取短信验证码";
							$scope.hasSendCode = false;
							$interval.cancel(interval);
						})
					}else{
						Tool.alert(data.mesage);
					}
				}).catch(function(){
					Tool.alert("发送验证码失败，请稍后再试!");
				}).finally(function(){
					$rootScope.loading =false;
				})
			}
		}
	}
})
