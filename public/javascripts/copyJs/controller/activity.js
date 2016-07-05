define(function(){
    return function($scope,$rootScope,$location,Tool,Ajax){
        // 查询参数
        $scope.queryParams = {
            pageRows:10,
            currentPage:1,
            flag:null,
        }

        $scope.noProduct = false;
        $scope.noProductText = "";
        $scope.products = [];

        // 页面初始化
        $scope.init = function(){
            $rootScope.hasBgColor = false;
            if($location.search().flag){
                $scope.queryParams.flag = $location.search().flag;
                $scope.queryActivity();
            }else{
                Tool.changeRoute("/home");
            }
        }

        // 查询活动数据
        $scope.queryActivity = function(){
            Ajax.post({
                url:Tool.host+"/wx/product/queryActivity",
                params:$scope.queryParams,
            }).then(function(data){
                if(data.code ===0){
                    if(data.data.length<1){
                        if($scope.products.length<1){
                            $scope.noProductText = "暂无数据";
                        }else{
                            $scope.noProductText = "已经没有了!";
                        }
                        $scope.noProduct = true;
                    }else{
                        $scope.mergeActivity(data.data);
                        $scope.products = $scope.products.concat(data.data);
                    }
                    
                }
            }).catch(function(){
                Tool.alert("获取数据失败，请稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        // 处理活动数据
        $scope.mergeActivity = function(items){
            items.forEach(function(item){
                if(item.priceunit!=null&&item.priceunit!=""){
                    item.preferPriceType = item.pricetype+"/"+item.priceunit;
                }else{
                    item.preferPriceType = item.pricetype;
                }
                if(item.samllimg==""||item.samllimg==null){
                    item.samllimg = "../contents/img/p_default.png";
                }
                if(item.type===6){
                    item.hasActivity = true;
                }
            })
        }

        // 跳转到详情页面
        $scope.detail = function(productId,hospitalId,type){
            if(productId&&hospitalId&&type){
                if(type===5){
                    Tool.changeRoute("/exam/detail","productId="+productId+"&hospitalId="+hospitalId);
                }if(type===6){
                    Tool.changeRoute("/exam/detail","productId="+productId+"&hospitalId="+hospitalId+"&activityp=元/次");
                }else{
                    Tool.changeRoute("/product/detail","productId="+productId+"&hospitalId="+hospitalId);
                }
            }
        }

        $scope.loadNext = function(){
            $scope.queryParams.currentPage++;
            $scope.queryActivity();
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
    }
})