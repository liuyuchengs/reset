define(function(){
	return function($scope,$rootScope,$location,Ajax,Tool){
		//导航条参数
		$scope.params = {
			hasPublish:false,
			hasReply:false,
		}
		$scope.queryParams = {
			pageRows:10,
			currentPage:1
		}
		$scope.item = "";
		$scope.noProduct = false;
		$scope.noProductText = "";
		$scope.posts = [];
		$scope.replys = [];
		$scope.user = {};

		$scope.init = function(){
			$rootScope.hasBgColor = false;
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
				$scope.getQuery();
			}else{
				Tool.changeRoute("/user");
			}
		}

		//切换导航条
		$scope.switch = function(p){
			if(p==="publish"){
				$scope.params.hasPublish = true;
				$scope.posts = [];
				$scope.replys = [];
				$scope.queryParams.currentPage =  1;
				$scope.loadNext =function(){
					$scope.queryParams.currentPage++;
					$scope.queryPost();
				}
				$scope.queryPost();
				if($scope.params.hasReply){
					$scope.params.hasReply = false;
				}
			}
			if(p==="reply"){  
				$scope.params.hasReply = true;
				$scope.posts = [];
				$scope.replys = [];
				$scope.queryParams.currentPage =  1;
				$scope.loadNext =function(){
					$scope.queryParams.currentPage++;
					$scope.queryReply();
				}
				$scope.queryReply();
				if($scope.params.hasPublish){
					$scope.params.hasPublish = false;
				}
			}
		}

		//清空数据
		$scope.clearData = function(){
			$scope.posts = [];
			$scope.replys = [];
			$scope.noProduct = false;
			$scope.queryParams.currentPage = 1;
		}

		//获取查询参数
		$scope.getQuery = function(){
			if($location.search().item){
				$scope.item = $location.search().item;
				$scope.switch($scope.item);
			}else{
				Tool.changeRoute("/uesr");
			}
		}

		// 查询我的回复
		$scope.queryReply = function(){
			Ajax.post({
				url:Tool.host+"/wx/repliesMessage/myReply",
				params:$scope.queryParams,
				headers:{
					'accessToken':Tool.userInfo.accessToken,
				}
			}).then(function(data){
				if(data.code===0){
					if(data.data.length<1){
						if($scope.replys.length<1){
							$scope.noProductText = "您还没有评论哦!";
						}else{
							$scope.noProductText = "已经没有评论了!";
						}
						$scope.noProduct = true;
					}else{
						data.data.forEach(function(item){
							item.dataStr = item.createDateStr.slice(5,10);
						})
						$scope.replys = $scope.replys.concat(data.data);
					}
				}else{
					Tool.alert("获取评论信息失败!");
				}
			}).catch(function(){
				Tool.alert("获取帖子信息失败!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 加载我的帖子数据
		$scope.queryPost = function(){
			Ajax.post({
				url:Tool.host+"/wx/post/myPost",
				params:$scope.queryParams,
				headers:{
					'accessToken':Tool.userInfo.accessToken,
				}
			}).then(function(data){
				if(data.data.length<1){
					if($scope.posts.length<1){
						$scope.noProductText = "您还没有发布帖子!";
					}else{
						$scope.noProductText = "已经没有了!";
					}
					$scope.noProduct = true;
				}else{
					data.data.forEach(function(item){
						if(item.visitNum==null||item.visitNum==""){
							item.visitNum=0;
						}
						if(item.commentNum==""||item.commentNum==null){
							item.commentNum = 0;
						}
					})
					$scope.posts = $scope.posts.concat(data.data);
				}
			}).catch(function(){
				Tool.alert("获取帖子信息失败!");
			}).finally(function(){
				$rootScope.loading = false;
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

		// 跳转到帖子页面
		$scope.goPost = function(id){
			Tool.changeRoute("/interaction/detail","id="+id);
		}

		//删除帖子
		$scope.deletePost = function(id,$event){
			$event.stopPropagation();
			Tool.comfirm("确定要删除吗?",function(){
				$rootScope.hasTip = false;
				Ajax.post({
					url:Tool.host+"/wx/post/deletePost",
					params:{postId:id,accessToken:Tool.userInfo.accessToken},
				}).then(function(data){
					if(data.code==0){
						$scope.deleteObj(id,$scope.posts);
					}
				}).catch(function(){
					Tool.alert("删除失败!");
				}).finally(function(){
					$rootScope.loading = false;
				})
			})
		}

		$scope.deleteReply = function(postid,id){
			Tool.comfirm("确定要删除吗?",function(){
				$rootScope.hasTip = false;
				Ajax.post({
					url:Tool.host+"/wx/repliesMessage/deleteReplies",
					params:{postId:postid,repliesId:id,accessToken:Tool.userInfo.accessToken},
				}).then(function(data){
					if(data.code==0){
						$scope.switch("reply");
					}
				}).catch(function(){
					Tool.alert("删除失败!");
				}).finally(function(){
					$rootScope.loading = false;
				})
			})
		}

		//从帖子数据中删除指定帖子
		$scope.deleteObj = function(id,array){
			for(var index in array){
				if(array[index].id==id){
					array.splice(index,1);
				}
			}
		}
	}
})