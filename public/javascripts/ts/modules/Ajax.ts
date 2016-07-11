/**
 * Ajax
 */
import IRootScope = require("IRootScope");
import Data = require("Data");
import Tool = require("Tool");
class Ajax{
    private $rootScope:IRootScope.rootScope;
    private $http:angular.IHttpService;
    private $q:angular.IQService;
    private Tool:Tool;
    constructor($rootScope:IRootScope.rootScope,$http:angular.IHttpService,$q:angular.IQService,Tool:Tool) {
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$q = $q;
        this.Tool = Tool;
    }

    /**
     * $http get请求
     * @params obj->请求参数，obj.url->地址
     */
    get(obj:Data.IGetQuery){
        if(obj.url){
            this.$rootScope.load.has = true;
            let defered:angular.IDeferred<any> = this.$q.defer();
            let headers:any = {};
            if(obj.headers){
                if(obj.headers.accessToken){
                    headers["accessToken"] = obj.headers.accessToken;
                }
            }
            this.$http.get(obj.url,{
                headers:headers
            }).success((data)=>{
                this.$rootScope.load.has = false;
                return defered.resolve(data);
            }).error((data)=>{
                this.$rootScope.load.has = false;
                this.alert("连接数据失败");
                return defered.reject(data);
            })
            return defered.promise;
        }
    }

    /**
     * $http post请求
     * 
     */
    post(obj:Data.IPostQuery){
        if(obj.url){
            this.$rootScope.load.has = true;
            let defered:angular.IDeferred<any> = this.$q.defer();
            var headers:any={};
            if(obj.headers){
                if(obj.headers.contentType){
                    headers["Content-Type"] = obj.headers.contentType;
                }
                if(obj.headers.accessToken){
                    headers["accessToken"] = obj.headers.accessToken;
                }
            }
            let dataStr = this.Tool.convertParams(obj.data);
            this.$http.post(obj.url,dataStr,{
                headers:headers
            }).success((data)=>{
                this.$rootScope.load.has = false;
                return defered.resolve(data);
            }).error((data)=>{
                this.$rootScope.load.has = false;
                this.alert("连接数据失败");
                return defered.reject(data);
            })
            return defered.promise;
        }
    }

    /**
     * 文本提示
     */
    private alert(mess:string,callback?:()=>void){
        this.$rootScope.messageTip.message = mess;
        this.$rootScope.messageTip.hasCancel = false;
        this.$rootScope.messageTip.hasComfirm = true;
        this.$rootScope.messageTip.has = true;
        if(callback){
            this.$rootScope.messageTip.comfirm = callback;
        }else{
            this.$rootScope.messageTip.comfirm = ()=>{
                this.$rootScope.messageTip.has = false;
            }
        }
    }
    
}

export = Ajax;