/**
 * $http的查询参数接口
 */
declare interface IGetQuery{
    url:string;
    headers:IHeaders;
}

declare module "IGetQuery"{
    export = IGetQuery;
}