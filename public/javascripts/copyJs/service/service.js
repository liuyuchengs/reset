define(["app","wx"],function(app,wx){

    // 数据访问服务
    app.service("Ajax",["$rootScope","$http","$q","Tool",function($rootScope,$http,$q,Tool){
        //使用promise封装ajax
        this.get = function (obj) {
                if (obj.url) {
                    $rootScope.loading = true;
                    var defered = $q.defer();
                    $http.get(obj.url,{
                        headers:obj.headers,
                    }).success(function (data) {
                        return defered.resolve(data);
                    }).error(function (data) {
                        return defered.reject(data);
                    });
                    return defered.promise;
                }
            };
        this.post = function (obj) {
            if (obj.url) {
                var defered = $q.defer();
                if(obj.headers) {
                    if(!obj.headers["Content-type"]){
                        obj.headers["Content-type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
                    }
                }else{
                    obj.headers = {
                        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    };
                }
                $rootScope.loading = true;
                //将参数对象转换成参数字符串
                obj.params = Tool.convertParams(obj.params);
                $http.post(obj.url, obj.params, {
                    headers: obj.headers
                }).success(function (data) {
                    defered.resolve(data);
                }).error(function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }
        };
    }]);

    // 工具服务
    app.service("Tool",["$rootScope","$location",function($rootScope,$location){
        
        //变量
        this.host = "http://192.168.0.104:3000";
        //this.host = "https://192.168.0.222:8555/www"
        this.userInfo = {};

        /*
        ** 操作localStorage和sessionStorage
        */
        this.getLocal = function(key){
            return JSON.parse(localStorage.getItem(key));
        };
        this.setLocal = function(key,value){
            localStorage.setItem(key,JSON.stringify(value));
        };
        this.removeLocal = function(key){
            localStorage.removeItem(key);
        };
        this.clearLocal = function(){
            localStorage.clear();
        }
        this.getSession = function(key){
            return JSON.parse(sessionStorage.getItem(key));
        }
        this.setSession = function(key,value){
            sessionStorage.setItem(key,JSON.stringify(value));
        }
        this.removeSession = function(key){
            sessionStorage.removeItem(key);
        }
        //跳转到指定url
        this.goUrl = function(url){
            if(url.length>0){
                location.href = url;
            }
        }

        //改变路由
        this.changeRoute = function(path,search){
            $location.path(path);
            if(search){
                $location.search(search);
            }else{
                $location.search("");
            }
        }

        //判断是否登录
        this.checkLogin = function(){
            if(this.getLocal("user")){
                return true;
            }else{
                return false;
            }
        }

        //判断是否完成用户信息
        this.isUserInfoComplete = function(){
            var userInfo = this.getLocal("user");
            if(userInfo.realname==""||userInfo.realname==null||userInfo.sex==""||userInfo.sex==null||userInfo.age==""||userInfo.age==null||userInfo.phone==""||userInfo.phone==null){
                return false;
            }else{
                return true;
            }
        }
        this.select = function(params,obj){
            for(var proto in obj){
                if(proto==params){
                    if(!obj[params].has){
                        obj[params].has = true;
                    }
                }else{
                    if(obj[proto].has){
                        obj[proto].has = false;
                    }
                }
            }
        }

        //确认按钮的提示框
        this.alert = function(mess,callback){
            $rootScope.message = mess;
            $rootScope.hasCancel = false;
            $rootScope.hasComfirm = true;
            $rootScope.hasTip = true;
            if(callback){
                $rootScope.comfirm = callback;
            }else{
                $rootScope.comfirm = function(){
                    $rootScope.hasTip = false;
                }
            }
        }

        //确认和取消按钮的提示框
        this.comfirm = function(mess,callback){
            $rootScope.message = mess;
            $rootScope.hasCancel = true;
            $rootScope.hasComfirm = true;
            $rootScope.hasTip = true;
            $rootScope.cancel = function(){
                $rootScope.hasTip = false;
            }
            $rootScope.comfirm = callback;
        }

        //获取用户信息
        this.loadUserinfo = function(){
            this.userInfo = this.getLocal("user");
        }

        //将对象转换成查询字符串
        this.convertParams = function(obj){
            var params = "";
            for(var property in obj){
                if(obj[property]!=null){
                    params += property+"="+obj[property]+"&";
                }
            }
            //截取掉最后一个"&"
            params = params.slice(0,params.length-1);
            return params;
        }

        //不监听window滚动
        this.noWindowListen = function(){
            window.onscroll = null;
        }
    }])

    // 微信服务
    app.service("Weixin",["$rootScope","Ajax","Tool",function($rootScope,Ajax,Tool){
        //初始化完成后，检查客户端版本 --first--
        this.wxInit = function($scope,callback){
            //wx初始化后检查客户端
            wx.ready(function(){
                wx.checkJsApi({
                    //需要检测的JS接口列表
                    jsApiList: ['getLocation','chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo'],
                    success: function(result) {
                        //以键值对的形式返回，可用的api值true，不可用为false
                        if(!result.checkResult.getLocation||!result.checkResult.chooseWXPay){
                            Tool.alert("客户端版本过低，请微信升级客户端!");
                        }
                    }
                })
                if(callback){
                    wx.getLocation({
                        type:"wgs84",
                        success:function(res){
                            var locationInfo = {
                                latitude:res.latitude, //维度
                                longitude:res.longitude //经度
                            }
                            Tool.setSession("locationInfo",locationInfo);
                            callback(locationInfo.latitude,locationInfo.longitude);
                        },
                        fail:function(){
                            $scope.locationInfo = "定位失败";
                        }
                    });
                }
            })
        }

        //初始化wx对象 --second--
        this.wxConfig = function(scope){
            var params = {
                debug:false,
                appId : "",
                timestamp : "",
                nonceStr : "",
                signature : "",
                jsApiList : ['getLocation','chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo'],
            };
            Ajax.post({
                url:Tool.host+"/weixin/check/getjsconfig",
                params: "url="+encodeURIComponent(location.href),
            }).then(function(data){
                params.appId = data.appId;
                params.timestamp = data.timestamp;
                params.nonceStr = data.nonceStr;
                params.signature = data.signature;
                wx.config(params);
            }).catch(function(){
                Tool.alert("初始化WX对象失败，请稍后再试！");
            })
        }

        //自定义分享内容,可分享至微信好友，微信朋友圈，qq好友，qq空间，腾讯微博
        this.wxShare = function(obj){
            /**
             * title:分享标题, desc:分享描述, link:分享链接, imgUrl:分享图标, type：分享类型，默认为link， dataUrl：分享数据的连接
             */
            wx.onMenuShareTimeline({
                title: obj.title,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success: obj.success,
                cancel: obj.cancel,
            });
            wx.onMenuShareAppMessage({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                type: obj.type,
                dataUrl: obj.dataUrl,
                success:obj.success,
                cancel: obj.cancel
            });
            wx.onMenuShareQQ({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success:obj.success,
                cancel:obj.cancel
            });
            wx.onMenuShareQZone({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success: obj.success,
                cancel:obj.cancel,
            });
            wx.onMenuShareWeibo({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success: obj.success,
                cancel: obj.cancel,
            });
        }

        //检查微信支付的参数是否完整
        this.wxCheckPayParams = function(params){
            if(params.timestamp==""||params.timestamp==null||params.nonceStr==""||params.nonceStr==null||params.package==""||params.package==null||params.signType==""||params.signType==null||params.paySign==""||params.paySign==null){
                return false;
            }else{
                return true;
            }
        }

        //获取支付参数，并发起支付
        this.wxPay = function(orderId,code,scope){
            var params = {
                timestamp: "",
                nonceStr: '',
                package: '',
                signType: '',
                paySign: '',
                success:function() {
                    Tool.changeRoute("/pay/result","payResult=success")
                },
                cancel:function(){
                    Tool.changeRoute("/pay/result","payResult=fail");
                },
                fail:function(){
                    Tool.changeRoute("/pay/result","payResult=fail");
                }
            };
            if(orderId!=""&orderId!=null){
                var accessToken = Tool.getLocal("accessToken");
                var url = Tool.host+"/wx/order/weixin";
                var params = "payType=JSAPI&orderId="+orderId+"&code="+code;
                Ajax.post({
                    url:url,
                    params:params,
                    headers:{
                        'accessToken':accessToken,
                    }
                }).then(function(data){
                    params.timestamp = data.data.timeStamp;
                    params.nonceStr = data.data.nonceStr;
                    params.package = data.data.package;
                    params.signType = "MD5";
                    params.paySign = data.data.sign;
                    if(params.timestamp==""||params.timestamp==null||params.nonceStr==""||params.nonceStr==null||params.package==""||params.package==null||params.signType==""||params.signType==null||params.paySign==""||params.paySign==null){
                        scope.loading = false;
                        Tool.alert(scope,"请求支付参数失败，请稍后再试!");
                    }else{
                        scope.loading = false;
                        wx.chooseWXPay(params);
                    }
                }).catch(function(){
                    Tool.alert("请求支付参数失败，请稍后再试!");
                })
            }
        }
    }])

    // 存储菜单变量
    app.service("Params",[function(){
        this.defaultParams = {
            default:{has:true,id:""}
        }
        this.areaParams = {
            default:{has:true,val:""},
            futian:{has:false,val:"福田区"},
            nanshan:{has:false,val:"南山区"},
            luohu:{has:false,val:"罗湖区"},
            baoan:{has:false,val:"宝安区"},
            longhua:{has:false,val:"龙华新区"},
            longgang:{has:false,val:"龙岗区"},
            yantian:{has:false,val:"盐田区"},
        }
        this.yakeParams = {
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
        this.meirongParams = {
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
        this.fckParams = {
            all:{has:true,id:""},
            jiancha:{has:false,id:48},
            fenmian:{has:false,id:49}
        };
        this.zhongyiParams = {
            all:{has:true,id:""},
            toubu:{has:false,id:51},
            jianjing:{has:false,id:52},
            yaobu:{has:false,id:53},
            tuibu:{has:false,id:54},
            quanshen:{has:false,id:55},
            jingluo:{has:false,id:56},
            qita:{has:false,id:57}
        }
        this.tijianParams = {
            default:{has:true,val:""},
            shangye:{has:false,val:75},
            changgui:{has:false,val:67},
            zhongnian:{has:false,val:69},
            laonian:{has:false,val:70},
            ruzhi:{has:false,val:71},
            yunqian:{has:false,val:72},
            qingnian:{has:false,val:68},
            ertong:{has:false,val:74},
            manbing:{has:false,val:73},
        }
        this.professionalParams = {
            default:{has:true,val:this.defaultParams,proId:""},
            yake:{has:false,val:this.yakeParams,proId:"2"},
            meirong:{has:false,val:this.meirongParams,proId:"3"},
            fck:{has:false,val:this.fckParams,proId:"4"},
            zhongyi:{has:false,val:this.zhongyiParams,proId:"6"},
            tijian:{has:false,val:this.tijianParams,proId:"5"}
        }
    }])

})