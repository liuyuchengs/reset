import ag = require("angular");
import IRootScope = require("IRootScope");
import Tool = require("../modules/Tool");
import Ajax = require("../modules/Ajax");

function exam($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax){
    $scope.products = [];
	$scope.hospitals = [];
    //变量参数
    $scope.params = {
        product:false,
        hospital:false
    }
    $scope.productQueryParams = {
        city:"深圳",
        area:"",
        professionId:5,
        itemId:"",
        order:"",
        specialty:"",
        currentPage:1,
        pageRows:10,
    }
    $scope.hospitalQueryParams = {
        city:"深圳",
        area:null,
        professionId:5,
        order:null,
        currentPage:1,
        pageRows:10,
    }

    $scope.sexParams = ToolService.sexParams;
    $scope.areaParams = ToolService.areaParams;
    $scope.classParams = ToolService.tijianParams;
    $scope.orderParams = ToolService.orderParams;

    $scope.menuParams = [
        {has:false,val:"区域",children:$scope.areaParams},
        {has:false,val:"排序",children:$scope.orderParams},
        {has:false,val:"类别",children:$scope.classParams},
        {has:false,val:"性别",children:$scope.sexParams}
    ]

    //切换导航项目
    $scope.switch = (item:any)=>{
        for(var proto in $scope.params){
            if(proto===item){
                $scope.params[item] = true;
            }else{
                $scope.params[proto] = false;
            }
        }
        setNext(item);
        if(item==="product"){
            $scope.products = [];
            $scope.productQueryParams.currentPage = 1;	
            loadProduct();
        }
        if(item==="hospital"){
            $scope.hospitals = [];
            $scope.hospitalQueryParams.currentPage = 1;
            loadHospital();
        }
    }

    // 切换菜单栏
    $scope.switchMenu = (index:number,obj:any[])=>{
        ToolService.select(index,obj,true);
        $rootScope.globalProp.hasBlackBg = obj[index].has;
    }

    // 点击菜单选项
    $scope.switchDrop = (index:number,obj:any[])=>{
        ToolService.select(index,obj);
        if(obj===$scope.areaParams){
            $scope.menuParams[0].has = false;
            $scope.productQueryParams.area = obj[index].id;
        }
        if(obj===$scope.orderParams){
            $scope.menuParams[1].has = false;
            $scope.productQueryParams.order = obj[index].id;
        }
        if(obj===$scope.classParams){
            $scope.menuParams[2].has = false;
            $scope.productQueryParams.itemId = obj[index].id;
        }
        if(obj===$scope.sexParams){
            $scope.menuParams[3].has = false;
            $scope.productQueryParams.specialty = obj[index].id;
        }
        $rootScope.globalProp.hasBlackBg = false;
        $scope.productQueryParams.currentPage = 0;
        $scope.products = [];
        $rootScope.followTip.has = false;
        loadProduct();
    }

    // 加载体检项目
    let loadProduct = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/product/querylist",
            data:$scope.productQueryParams,
        }).then((data)=>{
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

    //加载医院信息
    let loadHospital = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/hospital/querylist",
            data:$scope.hospitalQueryParams,
        }).then((data)=>{
            if(data.list.length>0){
                data.list.forEach((item:any)=>{
                    if(item.score==""||item.score==null){
                        item.score = "暂无评分";
                    }
                })
                $scope.hospitals = $scope.hospitals.concat(data.list);
            }else{
                if($scope.hospitals.length<1){
                    $rootScope.followTip.val = $rootScope.followTip.empty;
                }else{
                    $rootScope.followTip.val = $rootScope.followTip.no;
                }
                $rootScope.followTip.has = false;
            }
        })
    }

    //跳转到套餐详细页面
    $scope.detail = (proId:any,hosId:any)=>{
        ToolService.changeRoute("/exam/detail","productId="+proId+"&hospitalId="+hosId);
    }

    //合并价格单位,如：元/次
    let mergeProdcut = (items:any)=>{
        items.forEach((item:any)=>{
            if(item.priceunit!=null&&item.priceunit!=""){
                item.preferPriceType = item.pricetype+"/"+item.priceunit;
            }else{
                item.preferPriceType = item.pricetype;
            }
        })
    }

    //获取参数
    let getQuery = ()=>{
        if($location.search().item){
            var proto = $location.search().item;
            $scope.switch(proto);
        }else{
            ToolService.changeRoute("/home");
        }
    }

    //设置滚动加载
    let setNext = (item:any)=>{
        if(item==="product"){
            ToolService.onWindowListen(()=>{
                $scope.productQueryParams.currentPage++;
                loadProduct();
            })
        }
        if(item==="hospital"){
            ToolService.onWindowListen(()=>{
                $scope.hospitalQueryParams.currentPage++;
                loadHospital();
            })
        }
    }

    //初始化页面
    ToolService.reset();
    getQuery();
}

export = exam;