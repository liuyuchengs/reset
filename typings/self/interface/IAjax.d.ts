/// <reference path="./../../index.d.ts" />

/**
 * Ajax接口，封装$http服务
 */
declare interface IAjax{
    get:(obj:IGetQuery)=>angular.IPromise<any>;
    post:(obj:IPostQuery)=>angular.IPromise<any>;
}

declare module "IAjax"{
    export = IAjax;
}