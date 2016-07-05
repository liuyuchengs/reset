define(function(){
	return function($scope,$http,Tool,Ajax){
		$scope.loading = false;
		$scope.noProduct = false;
		$scope.noProductText="";
		$scope.products = [];

		$scope.queryParams = {
			flag:1,
			city:"深圳",
			area:"",
			professionId:"6",
			itemId:"",
			currentPage:1,
		}

		// 初始化
		$scope.init = function(){
			Ajax.loadHost($scope,function(){
				$scope.loadProduct();
			})
		}

		// 滚动监听
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

		// 加载体检项目
		$scope.loadProduct = function(){
			$scope.loading = true;
			var url = $scope.host+"/wx/product/queryByMidd";
			var params = Tool.convertParams($scope.queryParams);
			$http.post(url,params,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				}
			}).success(function(data){
				if(data.code==0){
					if(data.data.length<1){
						if($scope.products.length<1){
							$scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
						}else{
							$scope.noProductText = "已经没有项目了!";
						}
						$scope.noProduct = true;
					}else{
						$scope.mergeProdcut(data.data);
						$scope.products = $scope.products.concat(data.data);
					}
					$scope.loading=false;
				}
			}).error(function(){
				$scope.loading=false;
				$scope.noProduct = true;
				Tool.alert($scope,"查询数据失败，请稍后再试！");
			})
		}

		// 合并价格单位,如：元/次
		$scope.mergeProdcut = function(items){
			items.forEach(function(item){
				if(item.priceunit!=null&&item.priceunit!=""){
					item.preferPriceType = item.pricetype+"/"+item.priceunit;
				}else{
					item.preferPriceType = item.pricetype;
				}
			})
		}

		// 跳转到套餐详细页面
		$scope.detail = function(proId,hosId){
			Tool.goPage("/new/htmls/exam-detail.html#?productId="+proId+"&hospitalId="+hosId);
		}

		// 加载下一页数据
		$scope.loadNext = function(){
			$scope.queryParams.currentPage++;
			$scope.loadProduct();
		}
	}
})
