/**
 * Ajax
 */
class Ajax implements IAjax {
    private $rootScope:IRootScope;
    private $http:angular.IHttpService;
    private $q:angular.IQService;
    private ToolService:ITool;
    constructor($rootScope:IRootScope,$http:angular.IHttpService,$q:angular.IQService,ToolService:ITool) {
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$q = $q;
        this.ToolService = ToolService;
    }

    get(obj:IGetQuery){
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

    post(obj:IPostQuery){
        if(obj.url){
            this.$rootScope.load.has = true;
            let defered:angular.IDeferred<any> = this.$q.defer();
            var headers:any;
            if(obj.headers.contentType){
                headers = {
                    "accessToken":obj.headers.accessToken,
                    "Content-type":obj.headers.contentType,
                }
            }else{
                headers = {
                    "accessToken":obj.headers.accessToken
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