app.controller("wrapLavaCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
	$scope.productInfo = [];
	$scope.noProduct = false;
	$scope.noProductText = "";
	$scope.loading = false;
	$scope.queryParams = {
		flag:3,
		city:"深圳",
		area:"",
		professionId:"2",
		itemId:"",
		currentPage:1,
	}

	//初始化页面
	$scope.init = function(){
		Ajax.loadHost($scope,function(){
			$scope.loadGift();
		})
	}

	//获取项目信息
	$scope.loadGift = function(){
		$scope.loading = true;
		var url = $scope.host+"/wx/product/queryByMidd";
		var params = Tool.convertParams($scope.queryParams);
		$http.post(url,params,{
			headers: {
			   'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			 }
		}).success(function(data){
			if(data.code==0){
				if(data.data.length<1){
					if($scope.productInfo.length<1){
						$scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
					}else{
						$scope.noProductText = "已经没有项目了!";
					}
					$scope.noProduct = true;
				}else{
					$scope.mergeProdcut(data.data);
					$scope.productInfo = $scope.productInfo.concat(data.data);
				}
			}else{
				Tool.alert($scope,data.message);
			}
			$scope.loading = false;
		}).error(function(){
			$scope.noProduct = true;
			Tool.alert($scope,"获取项目信息失败，请稍后再试!");
			$scope.loading = false;
		})

	}

	//处理项目信息
	$scope.mergeProdcut = function(items){
		items.forEach(function(item){
			if(item.priceunit!=null&&item.priceunit!=""){
				item.preferPriceType = item.pricetype+"/"+item.priceunit;
			}else{
				item.preferPriceType = item.pricetype;
			}
			if(item.samllimg==""||item.samllimg==null){
				item.samllimg = "../contents/img/p_default.png";
			}
		})
	}

	//滚动监听
	window.onscroll = function(){
		if($scope.loading||$scope.noProduct){
			return;
		}
		var body = document.body;
	    var html = document.documentElement;
		var height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight );
		if(height>window.innerHeight){
			if (height - window.scrollY - window.innerHeight < 100) {
				$scope.loadNext();
			}
		}
	}

	// 加载下一页
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.loadGift();
	}

	// 跳转到项目详细信息
	$scope.detail = function(proId,hospitalId){
		var path = "/new/htmls/product-detail.html#?productId="+proId+"&hospitalId="+hospitalId;
		if($scope.itemState=="discount"){
			path += "&code=123";
		}else if($scope.itemState == "month"){
			path += "&discountid=123&flag=11";
		}
		Tool.goPage(path);
	}

	// 疑问按钮处理函数
	$scope.question = function(){
		Tool.alert($scope,"如有疑问，请致电0755-26905699");
	}
}])
