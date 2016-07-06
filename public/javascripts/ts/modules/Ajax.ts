/**
 * Ajax
 */
class Ajax implements IAjax {
    $rootScope:IRootScope;
    $http:angular.IHttpService;
    $q:angular.IQService;
    ToolService:ITool;
    constructor($rootScope:IRootScope,$http:angular.IHttpService,$q:angular.IQService,ToolService:ITool) {
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$q = $q;
        this.ToolService = ToolService;
    }

    get(obj:IGetQuery){
        if(obj.url){
            this.$rootScope.loading = true;
            let defered:angular.IDeferred<any> = this.$q.defer();
            this.$http.get(obj.url,{
                headers:obj.headers,
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
            this.$rootScope.loading = true;
            let defered:angular.IDeferred<any> = this.$q.defer();
            var headers = {};
            
        }
    }
    
}