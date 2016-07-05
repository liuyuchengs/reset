define(function(){
	return function($scope,$rootScope,$location,$http,Tool,Ajax){
		$scope.selectTime = false;
		$scope.hasDoctor = false;
		$scope.noSelectTime = true;
		$scope.hasDocSchedule = "";
		$scope.loading = false;
		$scope.selectDoc ="";
		$scope.hosId;
		$scope.proId;
		$scope.hasDiscount=false;
		$scope.productInfo;
		$scope.hospitalInfo;
		$scope.doctorInfo = [];
		$scope.activityp = "";
		$scope.follow = {
			hasFollow:false,
			followText:"关注"
		}
		$scope.productImg = [
			{
				"url":"../../contents/img/p_default.png"
			},{
				"url":"../../contents/img/p_default.png"
			}];
		$scope.hospitalImg = [
			{
				"url":"../../contents/img/p_default.png"
			}];
		$scope.scheduleInfo = [];
		$scope.scheduleParams = {};
		$scope.order = {
			hospitalId:"",
			doctorId:"",
			productId:"",
			scheduleId:"",
			doctorName:"",
			treatmentTime:"",
			hospitalName:"",
			hospitalAddress:"",
			preferPrice:"",
			productName:"",
			flag:null,
			dealMoney:"",
			payMoney:"",
			realMoney:"",
			giftMoney:"",
			code:null,
			discountid:null,
		}


		// 初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			$scope.loadQueryParams();
			$scope.order.hospitalId = $scope.hosId;
			$scope.order.productId = $scope.proId;
			$scope.queryProduct();
			$scope.queryProductImg();
			$scope.queryHospitalImg();
			$scope.queryDoctor();
			$scope.queryHospital();
		}

		// 加载url参数
		$scope.loadQueryParams = function(){
			$scope.hosId = $location.search().hospitalId;
			$scope.proId = $location.search().productId;
			if($location.search().flag){
				$scope.order.flag = $location.search().flag;
			}
			if($location.search().discountid){
				$scope.order.discountid = $location.search().discountid;
				$scope.hasDiscount = true;
			}
			if($location.search().code){
				$scope.order.code = $location.search().code;
			}
			if($location.search().activityp){
				$scope.activityp = $location.search().activityp;
			}
		}

		// 返回上一页
		$scope.back = function(){
			window.history.back();
		}

		// 查询项目信息
		$scope.queryProduct = function(){
			var obj = {
				productId:$scope.proId
			}
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
				obj.accessToken = Tool.userInfo.accessToken;
			}
			Ajax.post({
				url:Tool.host+"/wx/product/querybyid",
				params:obj
			}).then(function(data){
				if(data.data.focusState===1){
					$scope.follow.hasFollow = true;
					$scope.follow.followText = "已关注";
				}
				$scope.mergeProdcut(data.data);
				$scope.productInfo = data.data;
				$scope.order.productName = $scope.productInfo.title;
				$scope.order.preferPrice = "￥"+$scope.productInfo.preferPrice+$scope.productInfo.preferPriceType;
			}).catch(function(){
				Tool.alert("获取项目详细信息错误，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 查询项目图片
		$scope.queryProductImg = function(){
			Ajax.post({
				url:Tool.host+"/wx/image/querybymainid",
				params:{type:"PRODUCT",mainId:$scope.proId}
			}).then(function(data){
				if(data.length>0){
					$scope.mergeImg(data);
					$scope.productImg = data;
				}
			})
		}

		// 加载医院信息
		$scope.queryHospital = function(){
			Ajax.post({
				url:Tool.host+"/wx/hospital/querybyid",
				params:{id:$scope.hosId}
			}).then(function(data){
				$scope.hospitalInfo = data;
				if($scope.hospitalInfo.logo==""||$scope.hospitalInfo.logo==null){
					$scope.hospitalInfo.logo = "../../contents/img/p_default.png";
				}
				$scope.order.hospitalName = data.name;
				$scope.order.hospitalAddress = data.address;
			}).catch(function(){
				Tool.alert("医院信息加载失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 查询医院图片
		$scope.queryHospitalImg = function(){
			Ajax.post({
				url:Tool.host+"/wx/image/querybymainid",
				params:{
					type:"HOSPITAL",
					mainId:$scope.hosId
				}
			}).then(function(data){
				if(data.length>0){
					$scope.mergeImg(data);
					$scope.hospitalImg = data;
				}
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 查询医生信息
		$scope.queryDoctor = function(){
			Ajax.post({
				url:Tool.host+"/wx/doctor/queryscheduledoctorbyproductid",
				params:{productId:$scope.proId}
			}).then(function(data){
				if(data.list.length>0){
					$scope.hasDoctor = true;
					$scope.doctorInfo = data.list;
					$scope.doctorInfo.forEach(function(item){
						if(item.face==""||item.face==null){
							item.face="../../contents/img/p_default.png";
						}
						if(item.score==""||item.score==null){
							item.score = "暂无评"
						}
						item.selectTimeValue = "请选择";
						item.hasSelecTimeValue = false;
					})
				}
			}).catch(function(){
				Tool.alert("医生数据加载失败!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 查询医生排班信息
		$scope.queryDoctorSchedule = function(docId){
			if($scope.hasDocSchedule==docId){
				$scope.selectTime = true;
			}else{
				Ajax.post({
					url:Tool.host+"/wx/schedule/querybydoctorid",
					params:{doctorId:docId}
				}).then(function(data){
					$scope.mergeSchedule(data);
					$scope.scheduleInfo = data;
					$scope.loading = false;
					$scope.selectTime = true;
					$scope.hasDocSchedule = docId;
				}).catch(function(){
					Tool.alert("医生排班信息加载失败!");
				}).finally(function(){
					$rootScope.loading = false;
				})
			}
		}

		// 选择就医时间按钮
		$scope.chooseSchedule = function(docId,name){
			$scope.order.doctorId = docId;
			$scope.order.doctorName = name;
			$scope.queryDoctorSchedule(docId);
			$scope.selectDoc = docId;
		}

		// 选择具体的就医时间
		$scope.chooseTime = function(scheId,date){
			Tool.select(scheId,$scope.scheduleParams);
			$scope.order.scheduleId = scheId;
			$scope.order.treatmentTime = date;
			$scope.mergeDocSelect($scope.selectDoc,date);
			$scope.selectTime = false;
			$scope.noSelectTime = false;
		}

		// 下单按钮时间
		$scope.orderDetail = function(){
			if(!$scope.noSelectTime){
				if(!Tool.checkLogin()){
					Tool.comfirm("请先登录并完善个人信息",function(){
						$rootScope.hasTip = false;
						Tool.changeRoute("/login");
					})
				}else if(!Tool.isUserInfoComplete()){
					Tool.comfirm("请完善个人信息!",function(){
						$rootScope.hasTip = false;
						Tool.changeRoute("/user/userinfo");
					})
				}else{
					Tool.loadUserinfo();
					var params = {
						productId:$scope.order.productId
					};
					if($scope.order.code){
						params.code = $scope.order.code;
					};
					if($scope.order.discountid){
						params.discountid = $scope.order.discountid;
					};
					Ajax.post({
						url:Tool.host +"/wx/order/checkCodeMoney",
						params:params,
						headers:{
							"accessToken":Tool.userInfo.accessToken
						}
					}).then(function(data){
						$scope.order.dealMoney = data.dealMoney;
						$scope.order.payMoney = data.payMoney;
						$scope.order.realMoney = data.realMoney;
						$scope.order.giftMoney = data.giftMoney;
						if(parseFloat($scope.order.giftMoney)<=0&&$scope.order.flag!=11){
							$scope.order.flag = null;
						}
						Tool.setSession("makeorder",$scope.order);
						Tool.changeRoute("/makeorder")
					}).catch(function(){
						Tool.alert("加载App付款金额失败!");
					}).finally(function(){
						$rootScope.loading = false;
					})
				}
			}
		}

		// 图片为空时，设置默认图片,onerror无法处理src为空
		$scope.mergeImg = function(items){
			items.forEach(function(item){
				if(item.url==""||item.url==null){
					item.url = "../../contents/img/p_default.png";
				}
			})
		}

		// 修改项目信息
		$scope.mergeProdcut = function(data){
			if(data.priceunit!=null&&data.priceunit!=""){
				data.preferPriceType = data.pricetype+"/"+data.priceunit;
			}else{
				data.preferPriceType = data.pricetype;
			}
			if(data.smallImg==""||data.smallImg==null){
				data.smallImg = "../contents/img/p_default.png";
			}
			if($location.search().money){
				data.preferPrice = $location.search().money;
			}
		}

		// 截取排班参数
		$scope.mergeSchedule = function(items){
			for(var Itemindex in items){
				var item = items[Itemindex];
				for(var Timeindex in item.timeList){
					var time = item.timeList[Timeindex];
					if(Itemindex==0&&Timeindex==0){
						$scope.scheduleParams[time.scheduleid] = {
							has:true,
							value:time.date,
						}
					}else{
						$scope.scheduleParams[time.scheduleid] = {
							has:false,
							value:time.date,
						}
					}
				}
			}
		}

		// 改变就医时间的选取值
		$scope.mergeDocSelect = function(docId,value){
			$scope.doctorInfo.forEach(function(item){
				if(item.id==docId){
					item.selectTimeValue = value;
					item.hasSelecTimeValue = true;
				}else{
					item.selectTimeValue = "请选择";
					item.hasSelecTimeValue = false;
				}
			})
		}

		// 关注按钮处理函数
		$scope.switchFollow = function(){
			if(!Tool.checkLogin()){
				Tool.comfirm("请先登录!",function(){
					$rootScope.hasTip = false;
					Tool.changeRoute("/login");
				})
			}else{
				Tool.loadUserinfo();
				if($scope.follow.hasFollow){
					$scope.cacelFollow();
				}else{
					$scope.tofollow();
				}
			}
		}

		// 关注项目
		$scope.tofollow = function(){
			Ajax.post({
				url:Tool.host+"/wx/post/focus",
				params:{flag:3,userId:$scope.proId},
				headers:{
					'accessToken':Tool.userInfo.accessToken,
				}
			}).then(function(data){
				if(data.code==0){
					$scope.follow.hasFollow = true;
					$scope.follow.followText = "已关注";
				}else{
					Tool.alert("关注失败，稍后再试!");
				}
			}).catch(function(){
				Tool.alert("连接数据失败，请稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}

		// 取消关注项目
		$scope.cacelFollow = function(){
			Ajax.post({
				url:Tool.host+"/wx/post/cacelFocus",
				params:{flag:3,userId:$scope.proId},
				headers:{
					'accessToken':Tool.userInfo.accessToken,
				}
			}).then(function(data){
				if(data.code==0){
					$scope.follow.hasFollow = false;
					$scope.follow.followText = "关注";
				}else{
					Tool.alert("取消关注失败，稍后再试!");
				}
			}).catch(function(){
				Tool.alert("连接数据失败，稍后再试!");
			}).finally(function(){
				$rootScope.loading = false;
			})
		}
	}
})
