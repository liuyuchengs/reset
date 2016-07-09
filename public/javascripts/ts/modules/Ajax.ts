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
    private ToolService:Tool;
    constructor($rootScope:IRootScope.rootScope,$http:angular.IHttpService,$q:angular.IQService,ToolService:Tool) {
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$q = $q;
        this.ToolService = ToolService;
    }

    /**
     * $http get请求
     * @params obj->请求参数，obj.url->地址
     */
    get(obj:Data.IGetQuery){
        if(obj.url){
            this.$rootScope.load.has = true;
            let defered:angular.IDeferred<any> = this.$q.defer();
            this.$http.get(obj.url,{
                headers:{
                    accessToken:obj.headers.accessToken
                },
            }).success(function(data){
                return defered.resolve(data);
            }).error(function(data){
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
            var headers:any={
                "accessToken":"",
                "Content-type":"application/x-www-form-urlencoded;charset=UTF-8",
            }
            if(obj.headers){
                if(obj.headers.contentType){
                    headers["Content-type"] = obj.headers.contentType;
                }
                if(obj.headers.accessToken){
                    headers["accessToken"] = obj.headers.accessToken;
                }
            }
            let paramsStr:string = this.ToolService.convertParams(obj.data);
            this.$http.post(obj.url,paramsStr,{
                headers:headers
            }).success((data)=>{
                return defered.resolve(data);
            }).error((data)=>{
                return defered.reject(data);
            })
            return defered.promise;
        }
    }
    
}

export = Ajax;