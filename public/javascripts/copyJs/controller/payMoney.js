define(function(){
    return function($scope,$rootScope,Tool,Ajax){
        $scope.showPay = false;
        $scope.money = {
            dealMoney:null,
            balance:null,
        }
        $scope.init = function(){
            $rootScope.hasBgColor = false;
        }

        //页面初始化
        $scope.init = function(){
            $rootScope.hasBgColor = false;
            Tool.noWindowListen();
            if(Tool.checkLogin()){
                Tool.loadUserinfo();
                $scope.queryMoney();
            }else{
                Tool.changeRoute("/user");
            }
        }

        //显示支付
        $scope.choosePay = function(){
            if($scope.money.balance>0){
                $scope.showPay = true;
            }else{
                Tool.alert("没有可提取余额!");
            }
            
        }

        //隐藏支付
        $scope.hiddenPay = function(){
            $scope.showPay = false;
        }

        //查询提现金额
        $scope.queryMoney = function(){
            Ajax.post({
                url:Tool.host+"/wx/withDraw/myMoney",
                params:{"accessToken":Tool.userInfo.accessToken},
            }).then(function(data){
                if(data.code==0){
                    $scope.money = data.data;
                }else{
                    Tool.alert(data.message);
                }
            }).catch(function(){
                Tool.alert("获取信息失败，请稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        //申请提现
        $scope.getMoney = function(flag,$event){
            $event.stopPropagation();
            if($scope.checkAccount(flag)){
                Ajax.post({
                    url:Tool.host+"/wx/withDraw/apply",
                    params:{"accessToken":Tool.userInfo.accessToken,"flag":flag}
                }).then(function(data){
                    if(data.code==0){
                        $scope.showPay = false;
                        $scope.queryMoney();
                    }
                }).catch(function(){
                    Tool.alert("提取失败，请稍后再试!");
                }).finally(function(){
                    $rootScope.loading =false;
                })
            }else{
                Tool.alert("请先绑定微信或者支付宝账号!",function(){
                    $rootScope.hasTip = false;
                    Tool.changeRoute("/user/userinfo");
                })
            }
            
        }

        //检查是否有绑定账号
        $scope.checkAccount = function(flag){
            if(flag==1&&Tool.userInfo.alipay!=null&&Tool.userInfo.alipay!=""){
                return true;

            }else if(flag==2&&Tool.userInfo.wxpay!=null&&Tool.userInfo.wxpay!=""){
                return true;
            }else{
                return false;
            }
        }
    }
})