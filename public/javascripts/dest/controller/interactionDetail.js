define(["require", "exports", "Swiper"], function (require, exports, Swiper) {
    "use strict";
    function interactionDetail($scope, $rootScope, $location, ToolService, AjaxService) {
        $scope.post = {};
        $scope.replyMess = {};
        $scope.showReplyInputId = null;
        $scope.showPostinput = false;
        $scope.messageId = null; //评论id
        $scope.replyId = null; //被回复人id
        //回复输入框提示本文
        $scope.inputStyle = "输入你的回复...";
        $scope.postId = "";
        $scope.follow = {
            hasFollow: false,
            followText: "关注"
        };
        $scope.queryParams = {
            id: "",
            pageRows: 10,
            currentPage: 1
        };
        $scope.imgStyle = {
            "width": screen.width
        };
        $scope.swiperParams = {
            hasSwiper: false,
            showBefore: false,
            showAfter: false
        };
        // 初始化图片轮播插件
        var initSwiper = function () {
            //初始化swiper
            var myswiper1 = new Swiper("#swiper1", {
                loop: false,
                autoplayDisableOnInteraction: false,
                observeParents: true,
                observer: true,
            });
            var myswiper2 = new Swiper("#swiper2", {
                loop: false,
                autoplayDisableOnInteraction: false,
                observeParents: true,
                observer: true,
            });
        };
        //切换预览显示
        $scope.switchSwiper = function (item, has) {
            $scope.swiperParams.hasSwiper = has;
            if (item === "before") {
                $scope.swiperParams.showBefore = has;
            }
            if (item === "after") {
                $scope.swiperParams.showAfter = has;
            }
        };
        // 获取帖子id
        var getQueryString = function () {
            if ($location.search().id) {
                $scope.postId = $location.search().id;
                $scope.queryParams.id = $location.search().id;
            }
            else {
                ToolService.changeRoute("/interaction");
            }
        };
        // 加载下一页数据
        var loadNext = function () {
            $scope.queryParams.currentPage++;
            queryMessage();
        };
        // 获取帖子详细信息
        var queryPost = function () {
            var obj = {
                id: $scope.postId,
                accessToken: "",
            };
            if (ToolService.checkLogin()) {
                ToolService.loadUser();
                obj.accessToken = ToolService.user.accessToken;
            }
            else {
                obj.accessToken = null;
            }
            AjaxService.post({
                url: ToolService.host + "/wx/post/postDetail",
                data: obj
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.post = data.data;
                    if ($scope.post.faceImage !== null || $scope.post.faceImage !== "") {
                        $scope.post.faceImage = "https://biz.uokang.com/" + $scope.post.faceImage;
                    }
                    $scope.post.list1.length > 0 ? $scope.post.hasList1 = true : $scope.post.hasList1 = false;
                    $scope.post.list2.length > 0 ? $scope.post.hasList2 = true : $scope.post.hasList2 = false;
                    if (data.data.focusState === 1) {
                        $scope.follow.hasFollow = true;
                        $scope.follow.followText = "已关注";
                    }
                }
                else {
                    ToolService.alert(data.message);
                }
            });
        };
        // 查询评论信息
        var queryMessage = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/post/postMessage",
                data: $scope.queryParams
            }).then(function (data) {
                if (data.code == 0) {
                    if (data.data.commentList.length < 1) {
                        $rootScope.followTip.has = true;
                    }
                    mergeMessage(data.data);
                    if ($scope.replyMess.commentList) {
                        $scope.replyMess.commentList = $scope.replyMess.commentList.concat(data.data.commentList);
                    }
                    else {
                        $scope.replyMess = data.data;
                    }
                }
                else {
                    ToolService.alert("连接数据失败，请稍后再试!");
                }
            });
        };
        // 检查评论信息
        var mergeMessage = function (post) {
            post.message = "";
            var comment = post.commentList;
            if ($scope.replyMess.commentList) {
                var counts = $scope.replyMess.commentList.length;
            }
            else {
                var counts = 0;
            }
            if (comment.length > 0) {
                for (var outIndex in comment) {
                    var reply = comment[outIndex];
                    reply.count = counts + 1;
                    counts++;
                    reply.hasReplyInput = false;
                    reply.message = "";
                    if (reply.createDateStr) {
                        reply.createDateStr = reply.createDateStr.trim();
                        reply.createDateStr = reply.createDateStr.slice(5, 10);
                    }
                    if (parseInt(reply.praiseNum) < 1) {
                        reply.praiseNum = "点赞";
                    }
                    if (reply.repliesMessageList.length > 0) {
                        reply.hasReply = true;
                        var replyList = reply.repliesMessageList;
                        for (var inIndex in replyList) {
                            var replyListItem = replyList[inIndex];
                            if (replyListItem.replyName == "" || replyListItem.replyName == null) {
                                replyListItem.isReply = false;
                            }
                            else {
                                replyListItem.isReply = true;
                            }
                        }
                    }
                    else {
                        reply.hasReply = false;
                    }
                }
            }
        };
        // 检查是否登录
        var checkLogin = function () {
            if (!ToolService.checkLogin()) {
                ToolService.comfirm("请先登录！", function () {
                    $rootScope.followTip.has = false;
                    ToolService.changeRoute("/login");
                });
                return false;
            }
            else {
                ToolService.loadUser();
                return true;
            }
        };
        // 点赞，flag:0->帖子,flag:1->评论
        $scope.thumb = function (id, flag) {
            if (checkLogin()) {
                var reply = "";
                if (flag == 0) {
                    reply = $scope.post;
                }
                else {
                    for (var index in $scope.replyMess.commentList) {
                        if ($scope.replyMess.commentList[index].id == id) {
                            reply = $scope.replyMess.commentList[index];
                        }
                    }
                }
                AjaxService.post({
                    url: ToolService.host + "/wx/post/thumbUp",
                    data: { postId: id, flag: flag },
                    headers: {
                        accessToken: ToolService.user.accessToken,
                    }
                }).then(function (data) {
                    if (data.code == 0) {
                        reply.praiseNum = data.data;
                    }
                    else if (data.code == 1) {
                        ToolService.alert(data.message);
                    }
                });
            }
        };
        // 显示评论回复输入框
        $scope.showReplyInput = function (id, replyId, replyName) {
            if (checkLogin()) {
                if ($scope.showReplyInputId != id) {
                    var post = $scope.replyMess;
                    $scope.messageId = id;
                    if (replyId && replyId != ToolService.user.id) {
                        $scope.replyId = replyId;
                    }
                    if ($scope.showReplyInputId == null) {
                        for (var index in post.commentList) {
                            if (post.commentList[index].id == id) {
                                post.commentList[index].hasReplyInput = true;
                                $scope.inputStyle = "输入你的回复...";
                                if (replyId && replyId != ToolService.user.id) {
                                    $scope.inputStyle = "回复 " + replyName + ": ";
                                }
                            }
                        }
                    }
                    else {
                        for (var index in post.commentList) {
                            if (post.commentList[index].id == id) {
                                post.commentList[index].hasReplyInput = true;
                                $scope.inputStyle = "输入你的回复...";
                                if (replyId && replyId != ToolService.user.id) {
                                    $scope.inputStyle = "回复 " + replyName + ": ";
                                }
                            }
                            if (post.commentList[index].id == $scope.showReplyInputId) {
                                post.commentList[index].hasReplyInput = false;
                            }
                        }
                    }
                    $scope.showReplyInputId = id;
                }
            }
        };
        // 显示评论输入框
        $scope.showPostInput = function () {
            if (checkLogin()) {
                if ($scope.showPostinput == false) {
                    $scope.showPostinput = true;
                }
            }
        };
        // 隐藏评论输入框
        $scope.hidePostInput = function () {
            if ($scope.showPostinput == true) {
                $scope.showPostinput = false;
                $scope.post.message = "";
            }
        };
        // 隐藏评论回复输入框
        $scope.hideReplyInput = function (id) {
            var post = $scope.replyMess;
            for (var index in post.commentList) {
                if (post.commentList[index].id == id) {
                    post.commentList[index].hasReplyInput = false;
                    post.commentList[index].message = "";
                    $scope.inputStyle = "输入你的回复...";
                }
            }
            if ($scope.showReplyInputId) {
                $scope.showReplyInputId = null;
            }
            if ($scope.messageId) {
                $scope.messageId = null; //评论id
            }
            if ($scope.replyId) {
                $scope.replyId = null; //被回复人id
            }
        };
        // 发表评论
        $scope.sendPost = function (content) {
            if (content == "" || content == null) {
                ToolService.alert("消息为空!");
            }
            else {
                var params = {
                    postId: $scope.post.id,
                    replyState: 0,
                    content: content,
                    userId: ToolService.user.id,
                };
                AjaxService.post({
                    url: ToolService.host + "/wx/repliesMessage/addRepliesMessage",
                    data: params,
                    headers: {
                        accessToken: ToolService.user.accessToken,
                    }
                }).then(function (data) {
                    if (data.code == 0) {
                        $scope.hidePostInput();
                        data.data.count = $scope.replyMess.commentList.length + 1;
                        $scope.mergeNewReply(data.data);
                        $scope.replyMess.commentList.push(data.data);
                    }
                    else {
                        ToolService.alert(data.message);
                    }
                });
            }
        };
        // 检查新发表的评论信息
        $scope.mergeNewReply = function (reply) {
            if (reply.userImage === null || reply.userImage === "") {
                var user = ToolService.getLocal("user");
                if (user.sex === "男" || user.sex === "" || user.sex === null) {
                    reply.userImage = "../contents/img/men-head.png";
                }
                else {
                    reply.userImage = "../contents/img/women-head.png";
                }
            }
        };
        // 发表回复
        $scope.sendReply = function (content, id) {
            if (content == "" || content == null) {
                ToolService.alert("消息为空！");
            }
            else {
                var params = {
                    postId: $scope.post.id,
                    replyState: 1,
                    content: content,
                    userId: ToolService.user.id,
                    messageId: $scope.messageId,
                };
                if ($scope.replyId) {
                    params.replyId = $scope.replyId;
                }
                AjaxService.post({
                    url: ToolService.host + "/wx/repliesMessage/addRepliesMessage",
                    data: params,
                    headers: {
                        accessToken: ToolService.user.accessToken,
                    }
                }).then(function (data) {
                    if (data.code == 0) {
                        $scope.showReplyInputId = null;
                        $scope.messageId = null; //评论id
                        $scope.replyId = null; //被回复人id
                        $scope.hideReplyInput(id);
                        for (var index in $scope.replyMess.commentList) {
                            if ($scope.replyMess.commentList[index].id == id) {
                                if (data.data.replyName == "" || data.data.replyName == null) {
                                    data.data.isReply = false;
                                }
                                else {
                                    data.data.isReply = true;
                                }
                                $scope.replyMess.commentList[index].hasReply = true;
                                $scope.replyMess.commentList[index].repliesMessageList.push(data.data);
                                return;
                            }
                        }
                    }
                    else {
                        ToolService.alert(data.message);
                    }
                });
            }
        };
        // 关注按钮处理函数
        $scope.clickFollow = function () {
            if (!ToolService.checkLogin()) {
                ToolService.comfirm("请先登录!", function () {
                    $rootScope.messageTip.has = false;
                    ToolService.changeRoute("/login");
                });
            }
            else {
                if ($scope.follow.hasFollow) {
                    $scope.cacelFollow();
                }
                else {
                    $scope.tofollow();
                }
            }
        };
        // 关注发帖人
        $scope.tofollow = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/post/focus",
                data: {
                    flag: 1,
                    userId: $scope.post.userId
                },
                headers: {
                    accessToken: ToolService.user.accessToken,
                }
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.follow.hasFollow = true;
                    $scope.follow.followText = "已关注";
                }
                else {
                    ToolService.alert("关注失败，稍后再试!");
                }
            });
        };
        // 取消关注发帖人
        $scope.cacelFollow = function () {
            AjaxService.post({
                url: ToolService.host + "/wx/post/cacelFocus",
                data: {
                    flag: 1,
                    userId: $scope.post.userId
                },
                headers: {
                    accessToken: ToolService.user.accessToken
                }
            }).then(function (data) {
                if (data.code == 0) {
                    $scope.follow.hasFollow = false;
                    $scope.follow.followText = "关注";
                }
                else {
                    ToolService.alert("取消关注失败，稍后再试!");
                }
            });
        };
        // 跳转到医生页面
        $scope.goDoctor = function (id) {
            ToolService.changeRoute("/doctor/detail", "id=" + id);
        };
        // 跳转到项目页面
        $scope.goProduct = function (productId, hospitalId) {
            ToolService.changeRoute("/product/detail", "flag=1&productId=" + productId + "&hospitalId=" + hospitalId);
        };
        //页面初始化
        ToolService.reset();
        getQueryString();
        queryPost();
        queryMessage();
        initSwiper();
        ToolService.onWindowListen(loadNext);
    }
    return interactionDetail;
});
