import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");

function product($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax){
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
    $scope.hasLocation = false;
    //菜单项变量
    $scope.menuParams = [
        {has:false,val:"区域"},
        {has:false,val:"排序"},
        {has:false,val:"分类"},
    ]
    $scope.orderParams = ToolService.orderParams;
    $scope.areaParams = ToolService.areaParams;
    $scope.classParams = {};
    $scope.productParams = {
        yake:{has:false,val:"牙科",id:2},
        meirong:{has:false,val:"医学美容",id:3},
        fck:{has:false,val:"高端妇产科",id:4},
        zhongyi:{has:false,val:"中医理疗",id:6}
    }
    $scope.title="";
    $scope.products = [];

    // 加载地理信息
    let initLocation = function(){
        if(ToolService.getSession("locationInfo")){
            $scope.hasLocation = true;
        }
    }

    // 加载分类信息
    let loadClassParams = function(){
        if($location.search().product){
            var product = $location.search().product;
            $scope.productParams[product].has = true;
            $scope.title = $scope.productParams[product].val;
            $scope.queryParams.professionId = $scope.productParams[product].id;
            switch(product){
                case "yake":
                    $scope.classParams = ToolService.yakeParams;
                    break;
                case "meirong":
                    $scope.classParams = ToolService.meirongParams;
                    break;
                case "fck":
                    $scope.classParams = ToolService.fckParams;
                    break;
                case "zhongyi":
                    $scope.classParams = ToolService.zhongyiParams;
                    break;
                default:
                    $scope.classParams = {};
            }
        }else{
            ToolService.changeRoute("/home");
        }
    }

    // 下拉菜单切换
    $scope.switchMenu = (index:number,obj:any[])=>{
        ToolService.select(index,obj,true);
        $rootScope.globalProp.hasBlackBg = obj[index].has;
    }

    //下拉菜单项切换
    $scope.switchDrop = (index:number,obj:any[])=>{
        ToolService.select(index,obj);
        if(obj===$scope.areaParams){
            $scope.queryParams.area = obj[index].id;
            $scope.menuParams[0].has = false;
        }
        if(obj===$scope.orderParams){
            $scope.queryParams.order = obj[index].id;
            $scope.menuParams[1].has = false;
        }
        if(obj===$scope.classParams){
            $scope.queryParams.itemId = obj[index].id;
        }
        $scope.products = [];
        $rootScope.followTip.has = false;
        loadData();
    }

    // 查询数据
    let loadData = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/product/querylist",
            data:$scope.queryParams
        }).then((data:any)=>{
            if(data.length<1){
                if($scope.products.length<1){
                    $rootScope.followTip.val = $rootScope.followTip.empty;
                }else{
                    $rootScope.followTip.val = $rootScope.followTip.no;
                }
                $rootScope.followTip.has = true;
            }else{
                mergeProdcut(data);
                $scope.products = $scope.products.concat(data);
            }
        })
    }

    //处理项目信息
    let mergeProdcut = (items:any[])=>{
        items.forEach((item)=>{
            if(item.priceunit!=null&&item.priceunit!=""){
                item.preferPriceType = item.pricetype+"/"+item.priceunit;
            }else{
                item.preferPriceType = item.pricetype;
            }
        })
    }


    // 跳转到详细页面
    $scope.detail = (productId:any,hospitalId:any)=>{
        ToolService.changeRoute("/product/detail","flag=1&productId="+productId+"&hospitalId="+hospitalId);
    }

    // 疑问按钮处理函数
    $scope.question = ()=>{
        ToolService.alert("如有疑问，请致电0755-26905699");
    }

    //初始化
    ToolService.reset();
    loadClassParams();
    initLocation();
    loadData();
    ToolService.onWindowListen(()=>{
        $scope.queryParams.currentPage++;
        loadData();
    })
}

export = product;