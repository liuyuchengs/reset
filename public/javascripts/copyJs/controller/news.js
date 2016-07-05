/**
 * 资讯控制器
 */
define(function(){
	return function($scope,$rootScope,$location,Tool,Ajax){
		$scope.news = [];
		$scope.navValue = "all";
		$scope.currentPage = 1;
		$scope.pageRows = 10;
		$scope.loading = false;
		$scope.noProduct = false;
		$scope.noProductText = "";
		$scope.imgStyle = {
			"width":screen.width
		}
		$scope.navParam = {
			"all":{
				has:true,
				val:"综合"
			},
			"yake":{
				has:false,
				val:"牙科"
			},
			"meirong":{
				has:false,
				val:"美容"
			},
			"fck":{
				has:false,
				val:"妇产科"
			},
			"zhongyi":{
				has:false,
				val:"中医理疗"
			},
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

		//初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = false;
			$scope.initSwiper();
			$scope.loadNews();
		}

		// 初始化图片轮播插件
		$scope.initSwiper = function(){
			var myswiper = new Swiper(".swiper-container",{
				loop: false,
				pagination: '.swiper-pagination',
				autoplay: 5000,
				autoplayDisableOnInteraction:false,
				observeParents:true,  //
				observer:true,
			})
		}

		// 切换导航栏
		$scope.switch = function(type){
			if(type!=$scope.navValue){
				$scope.navValue = type;
				Tool.select(type,$scope.navParam);
				$scope.news = [];
				$scope.currentPage = 1;
				$scope.noProduct = false;
				$scope.loadNews();
			}
		}

		// 查询数据
		$scope.loadNews = function(){
			Ajax.post({
				url:Tool.host+"/wx/health/queryByType",
				params:{type:$scope.navParam[$scope.navValue].val,currentPage:$scope.currentPage,pageRows:$scope.pageRows},
			}).then(function(data){
				if(data.code==0){
					if(data.data.length<1){
						if($scope.news.length<1){
							$scope.noProductText = "暂时没有资讯信息!";
						}else{
							$scope.noProductText = "已经没有项目了!";
						}
						$scope.noProduct = true;
					}else{
						$scope.mergeImg(data.data);
						$scope.news = $scope.news.concat(data.data);
					}
				}else{
					Tool.alert(data.message);
				}
			}).catch(function(){
				$scope.noProduct = true;
				Tool.alert("查询数据失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 分页查询，查询下一页
		$scope.loadNext = function(){
			$scope.currentPage++;
			$scope.loadNews();
		}

		// 图片为空时，设置默认图片
		$scope.mergeImg = function(items){
			items.forEach(function(item){
				if(item.picture==""||item.picture == null){
					item.picture = "../contents/img/p_default.png";
				}
			})
		}

		// 跳转到详细页面
		$scope.toDetail = function(id){
			Tool.changeRoute("/news/detail","id="+id);
		}

		$scope.detail = {};
		$scope.id = null;

		//初始化页面
		$scope.initDetail = function(){
			$scope.id = $location.search().id;
			$rootScope.hasBgColor =false;
			Tool.noWindowListen();
			$scope.loadDetail();
		}

		//加载资讯信息
		$scope.loadDetail = function(){
			Ajax.post({
				url:Tool.host+"/wx/health/querydetail",
				params:{id:$scope.id},
			}).then(function(data){
				if(data.code==0){
					data.data.content = $scope.mergeDetail(data.data.content);
					$scope.detail = data.data;
				}else{
					Tool.alert("查询数据失败，请稍后再试!");
				}
			}).catch(function(){
				Tool.alert("查询数据失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		/**
		 * 对资讯信息进行排版
		 */
		$scope.mergeDetail = function(str){
			var arrayStr = str.split("\r\n");
			for(var index in arrayStr){
				arrayStr[index] = arrayStr[index].trim();
			}
			return arrayStr;
		}
	}
})
