define(function(){
	return function($scope,$rootScope,$location,$interval,Tool,Ajax){
		$scope.phone=""; //手机号码
		$scope.password=""; //密码
		$scope.passwordAgian=""; //确认密码
		$scope.code=""; //验证码
		$scope.codeText="获取短信验证码";
		$scope.referralCode = "";
		$scope.codeState = true; //验证码按钮是否可用
		$scope.disable = false;
		$scope.phoneCheckResult = false;

		// 加载host
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			if($location.search().code){
				$scope.referralCode = $location.search().code;
			}
		}

		// 注册按钮处理函数
		$scope.register = function(){
			if($scope.check()){
				$scope.codeCheck($scope.registering);
			}
		}

		// 检查输入是否符合要求
		$scope.check = function(){
			if(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone)&&$scope.password.length>=8&&$scope.password.length<=20&$scope.password==$scope.passwordAgian){
				return true;
			}else{
				if(!(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone))){
					Tool.alert("手机号码错误，请仔细检查!");
					return false;
				}else if($scope.password.length<8|$scope.password.length>20){
					Tool.alert("密码长度不符合要求，请输入8-20位的密码!");
					return false;
				}else if($scope.password!=$scope.passwordAgian){
					Tool.alert("两次输入的密码不一致，请重新输入!");
					return false;
				}else{
					Tool.alert("手机号码或者密码错误，请重新输入!");
					return false;
				}
			}
		}

		// 验证码按钮处理函数
		$scope.getCode = function(){
			if($scope.codeState){
				if($scope.phoneCheckResult){
					// 发送短信验证码
					Ajax.post({
						url:Tool.host+"/wx/register/sendsmsregistercode",
						params:{"phone":$scope.phone}
					}).then(function(data){
						if(data.code==0){
							var time = 59;
							$scope.codeState = false;
							var interval = $interval(function(){
								$scope.codeText = (time+" S");
								time--;
							},1000,60).then(function(){
								$scope.codeText = "获取短信验证码";
								$scope.codeState = true;
								$interval.cancel(interval);
							})
						}else{
							Tool.alert(data.message);
						}
					}).catch(function(){
						Tool.alert("发送验证码失败，请稍后再试!");
					}).finally(function(){
						$rootScope.loading =false;
					})
				}else{
					Tool.alert("请填写正确手机号码!");
				}
			}
		}

		// 检查手机号码是否可以注册
		$scope.phoneCheck = function(){
			if(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone)){
				Ajax.post({
					url:Tool.host+"/wx/register/registercheck",
					params:{name:"phone",param:$scope.phone},
				}).then(function(data){
					if(data.code==0){
						$scope.phoneCheckResult = true;
					}else{
						Tool.alert(data.message);
					}
				}).catch(function(){
					Tool.alert("手机号码检查失败，请稍后再试!");
				}).finally(function(){
					$rootScope.loading =false;
				})
			}else{
				$scope.phoneCheckResult = false;
				Tool.alert("手机号码不正确！");
			}
		}

		// 验证短信验证码是否正确
		$scope.codeCheck = function(callback){
			Ajax.post({
				url:Tool.host+"/wx/register/registercheck",
				params:{name:"verifyCode",param:$scope.code,p:$scope.phone},
			}).then(function(data){
				if(data.code==0){
					callback();
				}else{
					Tool.alert(data.message);
				}
			}).catch(function(){
				Tool.alert("验证码验证失败，请重试!");
			}).finally(function(){
					$rootScope.loading =false;
				})
		}

		// 注册
		$scope.registering = function(){
			Ajax.post({
				url:Tool.host+"/wx/register/register",
				params:{phone:$scope.phone,verifyCode:$scope.code,password:$scope.password,referralCode:$scope.referralCode},
			}).then(function(data){
				if(data.code==0){
					Tool.setLocal("user",data.data);
					Tool.alert("注册成功!",function(){
						$rootScope.hasTip = false;
						Tool.changeRoute("/user");
					})
				}else{
					Tool.alert(data.message);
				}
			}).catch(function(){
				Tool.alert("注册失败!");
			}).finally(function(){
					$rootScope.loading =false;
				})
		}
	}
})
