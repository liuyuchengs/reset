import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");

function discount($scope:any,$rootScope:IRootScope.rootScope,ToolService:Tool,AjaxService:Ajax){
    $scope.itemState = "discount";
    $scope.discountSelect = true;
    $scope.currentPage = 1;
    $scope.productInfo = [];

    // 加载特惠数据
    let loadGift = ()=>{
        if($scope.itemState=="discount"){
            var url = ToolService.host+"/wx/order/queryByGift";
        }else{
            var url = ToolService.host+"/wx/order/queryGift";
        }
        AjaxService.post({
            url:url,
            data:{currentPage:$scope.currentPage},
            headers:{
                accessToken:""
            }	
        }).then((data:any)=>{
            if(data.code==0){
                if(data.data.length<1){
                    if($scope.productInfo.length<1){
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }else{
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }else{
                    mergeProdcut(data.data);
                    $scope.productInfo = $scope.productInfo.concat(data.data);
                }
            }else{
                ToolService.alert(data.message);
            }
        })
    }

    // 处理特惠数据
    let mergeProdcut = (items:any)=>{
        items.forEach(function(item:any){
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

    // 切换最低和本月优惠
    $scope.switchState = (item:any)=>{
        if($scope.itemState!=item){
            if(item=="discount"){
                $scope.discountSelect = true;
            }else{
                $scope.discountSelect = false;
            }
        }
        $scope.currentPage = 1;
        $rootScope.followTip.has = false;
        $scope.itemState = item;
        $scope.productInfo = [];
        loadGift();
    }

    // 跳转到项目详细信息
    $scope.detail = (proId:any,hospitalId:any,preferPrice:any)=>{
        var query = "productId="+proId+"&hospitalId="+hospitalId;
        if($scope.itemState=="discount"){
            query += "&code=123";
        }else if($scope.itemState == "month"){
            query += "&discountid=123&flag=11&money="+preferPrice;
        }
        ToolService.changeRoute("/product/detail",query);
    }

    // 疑问按钮处理函数
    $scope.question = ()=>{
        ToolService.alert("如有疑问，请致电0755-26905699");
    }

    
    // 初始化页面
    ToolService.reset();
    loadGift();
    ToolService.onWindowListen(()=>{
        $scope.currentPage++;
        loadGift();
    })

}

export = discount