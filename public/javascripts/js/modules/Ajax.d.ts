/**
 * Ajax
 */
declare class Ajax implements IAjax {
    private $rootScope;
    private $http;
    private $q;
    private ToolService;
    constructor($rootScope: IRootScope, $http: angular.IHttpService, $q: angular.IQService, ToolService: ITool);
    get(obj: IGetQuery): ng.IPromise<any>;
    post(obj: IPostQuery): ng.IPromise<any>;
}
export = Ajax;
