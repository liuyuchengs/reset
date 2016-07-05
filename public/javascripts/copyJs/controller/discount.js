define(function(){
	return function($scope,$rootScope,Tool,Ajax){
		$scope.itemState = "discount";
		$scope.discountSelect = true;
		$scope.currentPage = 1;
		$scope.productInfo = [];
		$scope.noProduct = false;
		$scope.noProductText = "";
		$scope.loading = false;

		// 初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = false;
			$scope.loadGift();
		}

		// 加载特惠数据
		$scope.loadGift = function(){
			if($scope.itemState=="discount"){
				var url = Tool.host+"/wx/order/queryByGift";
			}else{
				var url = Tool.host+"/wx/order/queryGift";
			}
			Ajax.post({
				url:url,
				params:{currentPage:$scope.currentPage},
				headers:{
					accessToken:""
				}	
			}).then(function(data){
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
					Tool.alert(data.message);
				}
			}).catch(function(){
				$scope.noProduct = true;
				Tool.alert("获取项目信息失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 处理特惠数据
		$scope.mergeProdcut = function(items){
			items.forEach(function(item){
				if(item.priceunit!=null&&item.priceunit!=""){
					item.preferPriceType = item.pricetype+"/"+item.priceunit;
				}else{
					item.preferPriceType = item.pricetype;
				}
				if(item.money){
					item.preferPrice = item.money;
				}
			})
		}

		// 滚动监听
		window.onscroll = function(){
			if($rootScope.loading||$scope.noProduct){
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
			$scope.currentPage++;
			$scope.loadGift();
		}

		// 切换最低和本月优惠
		$scope.switchState = function(item){
			if(item=="discount"){
				if($scope.itemState!=item){
					$scope.currentPage = 1;
					$scope.discountSelect = true;
					$scope.noProduct = false;
					$scope.itemState = item;
					$scope.productInfo = [];
					$scope.loadGift();
				}
			}else{
				if($scope.itemState!=item){
					$scope.currentPage = 1;
					$scope.discountSelect = false;
					$scope.noProduct = false;
					$scope.itemState = item;
					$scope.productInfo = [];
					$scope.loadGift();
				}
			}
		}

		// 跳转到项目详细信息
		$scope.detail = function(proId,hospitalId,preferPrice){
			var query = "productId="+proId+"&hospitalId="+hospitalId;
			if($scope.itemState=="discount"){
				query += "&code=123";
			}else if($scope.itemState == "month"){
				query += "&discountid=123&flag=11&money="+preferPrice;
			}
			Tool.changeRoute("/product/detail",query);
		}

		// 疑问按钮处理函数
		$scope.question = function(){
			Tool.alert("如有疑问，请致电0755-26905699");
		}
	}
})
