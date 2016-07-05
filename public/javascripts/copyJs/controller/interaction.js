define(function(){
    return function($scope,$rootScope,$http,Tool,Ajax){
        $scope.noProductText = "";
        $scope.noProduct = false;
        $scope.hasInteractionMenu = true;
        $scope.queryParams = {
            flag:1,
            pageRows:10,
            currentPage:1
        }
        $scope.navParams = {
            kanya:{has:true,val:1},
            shumei:{has:false,val:2},
            yunsheng:{has:false,val:3}
        }
        
        $scope.posts = [];

        //初始化页面
        $scope.init = function(){
            $rootScope.hasBgColor = false;
            $scope.queryPost();
            $scope.initSwiper();
        }



        // 加载帖子数据
        $scope.queryPost = function(){
            Ajax.post({
                url:Tool.host+"/wx/post/postList",
                params:$scope.queryParams,
            }).then(function(data){
                if(data.data.length<1){
                    if($scope.posts.length<1){
                        $scope.noProductText = "还没有帖子信息";
                    }else{
                        $scope.noProductText = "已经没有项目了!";
                    }
                    $scope.noProduct = true;
                }else{
                    $scope.mergePost(data.data);
                    $scope.posts = $scope.posts.concat(data.data);
                }
            }).catch(function(){
                Tool.alert("获取帖子信息失败!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        // 处理帖子数据
        $scope.mergePost = function(items){
            items.forEach(function(item){
                if(item.visitNum==null||item.visitNum==""){
                    item.visitNum=0;
                }
                if(item.commentNum==""||item.commentNum==null){
                    item.commentNum = 0;
                }
                item.faceImage = ("https://biz.uokang.com/"+item.faceImage);
                for(var index in item.list2){
                    if(item.list2[index]==""||item.list2[index]==null){
                        item.list2.splice(index,1);
                    }
                }
            })
        }

        // 加载下一页数据
        $scope.loadNext = function(){
            $scope.queryParams.currentPage++;
            $scope.queryPost();
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

        // 切换帖子类型
        $scope.switchNav = function(item){
            $scope.queryParams.flag = $scope.navParams[item].val;
            Tool.select(item,$scope.navParams);
            $scope.queryParams.currentPage = 1;
            $scope.noProduct = false;
            $scope.noProductText = "";
            $scope.posts = [];
            $scope.queryPost();
        }

        // 跳转到详细页面
        $scope.detail = function(id){
            Tool.changeRoute("/interaction/detail","id="+id);
        }
    }
})