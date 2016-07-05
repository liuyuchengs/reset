define(["jquery"],function($){
	return function($scope,$rootScope,$location,$http,Tool,Ajax){
		$scope.hasSee = true;
		$scope.content = null;
		$scope.noSelect = true;
		$scope.postData = new FormData();
		$scope.doctorId = null;
		
		//input控件参数
		$scope.params = {
			input1:{has:false,url:"",val:"#input1"},
			input2:{has:false,url:"",val:"#input2"},
			input3:{has:false,url:"",val:"#input3"},
			input4:{has:false,url:"",val:"#input4"},
			input5:{has:false,url:"",val:"#input5"},
			input6:{has:false,url:"",val:"#input6"},
		}
		
		// 初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			$scope.getParams();
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
			}else{
				Tool.comfirm("请先登录",function(){
					$rootScope.hasTip = false;
					Tool.changeRoute("/login");
				})
			}
			$scope.listen();
		}

		// 获取医生id参数
		$scope.getParams = function(){
			if($location.search().id){
				$scope.doctorId = $location.search().id;
			}else{
				history.back();
			}
		}

		// 切换是否医生可见
		$scope.chooseSee = function(){
			$scope.hasSee = !$scope.hasSee;
		}

		// 监听input元素选择图片
		$scope.listen = function(){
			$("#input1").on("change",function(){
				var url = $scope.getUrl(this.files[0]);
				$scope.params.input1.has = true;
				$scope.params.input1.url = url;
				$scope.noSelect = false;
				$scope.$apply();
			})
			$("#input2").on("change",function(){
				var url = $scope.getUrl(this.files[0]);
				$scope.params.input2.has = true;
				$scope.params.input2.url = url;
				$scope.noSelect = false;
				$scope.$apply();
			})
			$("#input3").on("change",function(){
				var url = $scope.getUrl(this.files[0]);
				$scope.params.input3.has = true;
				$scope.params.input3.url = url;
				$scope.noSelect = false;
				$scope.$apply();
			})
			$("#input4").on("change",function(){
				var url = $scope.getUrl(this.files[0]);
				$scope.params.input4.has = true;
				$scope.params.input4.url = url;
				$scope.noSelect = false;
				$scope.$apply();
			})
			$("#input5").on("change",function(){
				var url = $scope.getUrl(this.files[0]);
				$scope.params.input5.has = true;
				$scope.params.input5.url = url;
				$scope.noSelect = false;
				$scope.$apply();
			})
			$("#input6").on("change",function(){
				var url = $scope.getUrl(this.files[0]);
				$scope.params.input6.has = true;
				$scope.params.input6.url = url;
				$scope.noSelect = false;
				$scope.$apply();
			})
		}

		// 获取input元素图片的url，做图片预览
		$scope.getUrl = function(obj){
			var url = null;
			if (window.createObjectURL != undefined) { // basic
				url = window.createObjectURL(obj);
			} else if (window.URL != undefined) { // mozilla(firefox)
				url = window.URL.createObjectURL(obj);
			} else if (window.webkitURL != undefined) { // webkit or chrome
				url = window.webkitURL.createObjectURL(obj);
			}
			return url;
		}

		// 触发随便说说选择照片
		$scope.choosePic = function(){
			var count = 0;
			for(var item in $scope.params){
				var prototype = $scope.params[item];
				count++;
				if(!prototype.has){
					$(prototype.val).click();
					return ;
				}
			}
			if(count==6){
				Tool.alert($scope,"最多只能上传6张图片!");
			}
		}

		// 删除图片
		$scope.remove = function(item){
			if($scope.params[item]){
				$scope.params[item].has=false;
				$scope.params[item].url="";
				$scope.clear(item);
				$scope.listen(); //替换input后重新监听
			}
		}

		// 重新替换要重新选择图片的input元素
		$scope.clear = function(selector){
			var element = document.getElementById(selector);
			element.outerHTML = element.outerHTML; //重新替换Input元素
		}

		// 调整照片参数
		$scope.mergePic = function(){
			var imgStr = "img";
			var pStr = "p";
			var count = 1;
			var afterCount = 3;
			var file = new Blob([""],{type:"image/jpeg"});
			for(var index in $scope.beforeParams){
				var prototype = $scope.beforeParams[index];
				if(prototype.has){
					if(count<4){
						$scope.postData.append(imgStr+count,$(prototype.val).get(0).files[0]);
						count++;
					}else{
						$scope.postData.append(pStr+(count-afterCount),$(prototype.val).get(0).files[0]);
						count++;
					}
				}
			}
			for(count;count<7;count++){
				if(count<4){
					$scope.postData.append(imgStr+count,file);
				}else{
					$scope.postData.append(pStr+(count-afterCount),file);
				}
			}
		}

		// 提交提问
		$scope.send = function(){
			if($scope.content===null||$scope.content===""){
				Tool.alert("请填写咨询内容!");
			}else{
				var url = Tool.host+"/wx/post/addPost";
				$scope.mergePic();
				$scope.postData.append("postName","");
				$scope.postData.append("postContent",$scope.content);
				$scope.postData.append("postFlags",3);
				$scope.postData.append("doctorId",$scope.doctorId);
				$rootScope.loading = true;
				$rootScope.loading = true;
				$http.post(url,$scope.postData,{
					headers:{
						"Content-Type":undefined,
						"accessToken":Tool.userInfo.accessToken,
					}
				}).success(function(data){
					$rootScope.loading = false;
					if(data.code==0){
						history.back();
					}else{
						Tool.alert("连接数据失败，请稍后再试!");
					}
				}).error(function(){
					$rootScope.loading = false;
					$scope.postData = new FormData();
					Tool.alert("连接失败，请稍后再试!");
				})
			}
		}

		// 返回上一页
		$scope.back = function(){
			history.back();
		}
	}
})
