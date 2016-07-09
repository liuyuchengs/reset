/**
 * Ajax
 */
import IRootScope = require("IRootScope");
import Data = require("Data");
import Tool = require("Tool");
declare class Ajax {
    private $rootScope;
    private $http;
    private $q;
    private ToolService;
    constructor($rootScope: IRootScope.rootScope, $http: angular.IHttpService, $q: angular.IQService, ToolService: Tool);
    /**
     * $http get请求
     * @params obj->请求参数，obj.url->地址
     */
    get(obj: Data.IGetQuery): ng.IPromise<any>;
    /**
     * $http post请求
     *
     */
    post(obj: Data.IPostQuery): ng.IPromise<any>;
}
export = Ajax;
