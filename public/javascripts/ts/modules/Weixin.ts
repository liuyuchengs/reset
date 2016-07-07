/**
 * Weixin
 */
class Weixin {
    private $rootScope:angular.IRootScopeService;
    private AjaxService:IAjax;
    private ToolService:ITool;
    constructor($rootScope:angular.IRootScopeService,AjaxService:IAjax,ToolService:ITool) {
        this.$rootScope = $rootScope;
        this.AjaxService = AjaxService;
        this.ToolService = ToolService;
    }
}