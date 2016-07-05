define(function(){
	return function($scope,$rootScope,$location,Tool,Ajax){
		//查询条件
		$scope.queryParams = {
			city:"深圳",
			area:"",
			professionId:"",
			itemId:"",
			order:"",
			currentPage:1,
			pageRows:10,
			location:"",
		}
		//动画变量
		$scope.noProduct = false;
		$scope.noProductText = "";
		$scope.hasBg = false;
		$scope.hasLocation = false;
		//菜单切换变量
		$scope.hasOrder = false;
		$scope.hasArea = false;
		$scope.hasClass = false;
		//菜单项变量
		$scope.menuParams = {
			area:false,
			order:false,
			classes:false,
		}
		$scope.orderParams = {
			default:{has:true,val:""},
			price:{has:false,val:"prefer_price asc"},
			priceDesc:{has:false,val:"prefer_price desc"},
			scoreDesc:{has:false,val:"hospital_score asc"},
			countDesc:{has:false,val:"sales desc"},
			locationes:{has:false,val:"locationes"}
		}
		$scope.areaParams = {
			default:{has:true,val:""},
			futian:{has:false,val:"福田区"},
			nanshan:{has:false,val:"南山区"},
			luohu:{has:false,val:"罗湖区"},
			baoan:{has:false,val:"宝安区"},
			longhua:{has:false,val:"龙华新区"},
			longgang:{has:false,val:"龙岗区"},
			yantian:{has:false,val:"盐田"},
		}
		$scope.classParams = {};
		$scope.productParams = {
			yake:{has:false,val:"牙科",id:2},
			meirong:{has:false,val:"医学美容",id:3},
			fck:{has:false,val:"高端妇产科",id:4},
			zhongyi:{has:false,val:"中医理疗",id:6}
		}
		$scope.title="";
		$scope.products = [];

		//初始化
		$scope.init = function(){
			$rootScope.hasBgColor = false;
			$scope.loadClassParams();
			$scope.initLocation();
			$scope.loadData();
		}

		// 加载地理信息
		$scope.initLocation = function(){
			if(Tool.getSession("locationInfo")){
				$scope.hasLocation = true;
			}
		}

		// 加载分类信息
		$scope.loadClassParams = function(){
			if($location.search().product){
				var product = $location.search().product;
				$scope.productParams[product].has = true;
				$scope.title = $scope.productParams[product].val;
				$scope.queryParams.professionId = $scope.productParams[product].id;
				switch(product){
					case "yake":
						$scope.classParams = {
							all:{has:true,id:""},
							zzy:{has:false,id:19},
							xiya:{has:false,id:20},
							kcy:{has:false,id:82},
							buya:{has:false,id:22},
							baya:{has:false,id:23},
							ycmr:{has:false,id:24},
							jiaozheng:{has:false,id:64},
							yichi:{has:false,id:65},
							yzzl:{has:false,id:63},
							qita:{has:false,id:60},
						};
						break;
					case "meirong":
						$scope.classParams = {
							all:{has:true,id:""},
							yanbu:{has:false,id:7},
							mianbu:{has:false,id:8},
							bibu:{has:false,id:9},
							xiong:{has:false,id:45},
							xizhi:{has:false,id:12},
							simi:{has:false,id:78},
							zhushe:{has:false,id:79},
							jiguang:{has:false,id:80},
							koucun:{has:false,id:81},
							qita:{has:false,id:13},
						};
						break;
					case "fck":
						$scope.classParams = {
							all:{has:true,id:""},
							jiancha:{has:false,id:48},
							fenmian:{has:false,id:49}
						};
						break;
					case "zhongyi":
						$scope.classParams = {
							all:{has:true,id:""},
							toubu:{has:false,id:51},
							jianjing:{has:false,id:52},
							yaobu:{has:false,id:53},
							tuibu:{has:false,id:54},
							quanshen:{has:false,id:55},
							jingluo:{has:false,id:56},
							qita:{has:false,id:57}
						}
						break;
					default:
						$scope.classParams = {
							all:{has:true,id:""},
							zzy:{has:false,id:19},
							xiya:{has:false,id:20},
							kcy:{has:false,id:82},
							buya:{has:false,id:22},
							baya:{has:false,id:23},
							ycmr:{has:false,id:24},
							jiaozheng:{has:false,id:64},
							yichi:{has:false,id:65},
							yzzl:{has:false,id:63},
							other:{has:false,id:60},
						};
				}
			}else{
				$scope.hasProduct["yake"] = true;
				$scope.title = $scope.productParams["yake"].val;
				$scope.queryParams.professionId = 2;
			}
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

		// 下拉菜单切换
		$scope.switchMenu =function(menu){
			switch(menu){
				case "area":
					if($scope.hasOrder){
						$scope.hasOrder = false;
						$scope.menuParams.order = false;
					};
					if($scope.hasClass){
						$scope.hasClass = false;
						$scope.menuParams.classes = false;
					};
					$scope.hasArea = !$scope.hasArea;
					if($scope.hasArea){
						$scope.menuParams.area = true;
					}else{
						$scope.menuParams.area = false;
					}
					break;
				case "order":
					if($scope.hasArea){
						$scope.hasArea = false;
						$scope.menuParams.area = false;
					};
					if($scope.hasClass){
						$scope.hasClass = false;
						$scope.menuParams.classes = false;
					};
					$scope.hasOrder = !$scope.hasOrder;
					if($scope.hasOrder){
						$scope.menuParams.order = true;
					}else{
						$scope.menuParams.order = false;
					}
					break;
				case "class":
					if($scope.hasOrder){
						$scope.hasOrder = false;
						$scope.menuParams.order = false;
					};
					if($scope.hasArea){
						$scope.hasArea = false;
						$scope.menuParams.area = false;
					};
					$scope.hasClass = !$scope.hasClass;
					if($scope.hasClass){
						$scope.menuParams.classes = true;
					}else{
						$scope.menuParams.classes = false;
					}
					break;
			}
			if($scope.hasOrder||$scope.hasArea||$scope.hasClass){
				$scope.hasBg = true;
			}else{
				$scope.hasBg = false;
			}
		}

		// 区域下拉菜单项点击
		$scope.areaSelect =function(params){
			Tool.select(params,$scope.areaParams);
			$scope.queryParams.area = $scope.areaParams[params].val;
			$scope.queryParams.currentPage = 1;
			$scope.products = [];
			$scope.noProduct = false;
			$scope.loadData();
			$scope.switchMenu("area");
		}

		// 排序下拉菜单项点击
		$scope.orderSelect = function(params){
			Tool.select(params,$scope.orderParams);
			$scope.queryParams.order = $scope.orderParams[params].val;
			$scope.queryParams.currentPage = 1;
			$scope.products = [];
			$scope.noProduct = false;
			$scope.switchMenu("order");
			if(params=="locationes"){
				var locationInfo = Tool.getSession("locationInfo");
				$scope.queryParams.location = locationInfo.longitude+","+locationInfo.latitude;
			}else{
				$scope.queryParams.location = "";
			}
			$scope.loadData();
		}

		// 类别下拉菜单项点击
		$scope.classSelect = function(params){
			Tool.select(params,$scope.classParams);
			$scope.queryParams.itemId = $scope.classParams[params].id;
			$scope.queryParams.currentPage = 1;
			$scope.products = [];
			$scope.noProduct = false;
			$scope.switchMenu("class");
			$scope.loadData();
		}

		// 查询数据
		$scope.loadData = function(){
			Ajax.post({
				url:Tool.host+"/wx/product/querylist",
				params:$scope.queryParams
			}).then(function(data){
				if(data.length<1){
					if($scope.products.length<1){
						$scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
					}else{
						$scope.noProductText = "已经没有项目了!";
					}
					$scope.noProduct = true;
				}else{
					$scope.mergeProdcut(data);
					$scope.products = $scope.products.concat(data);
				}
			}).catch(function(){
				$scope.noProduct = true;
				Tool.alert("数据加载失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
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
			})
		}

		// 加载下一页数据
		$scope.loadNext = function(){
			$scope.queryParams.currentPage++;
			$scope.loadData();
		}

		// 跳转到详细页面
		$scope.detail = function(productId,hospitalId){
			Tool.changeRoute("/product/detail","flag=1&productId="+productId+"&hospitalId="+hospitalId);
		}

		// 疑问按钮处理函数
		$scope.question = function(){
			Tool.alert("如有疑问，请致电0755-26905699");
		}
	}
})