/**
 * $http服务的post参数
 */
declare interface IPostQuery{
    url:string;
    headers:IHeaders;
    data:[[string,any]];
}

declare module "IPostQuery"{
    export = IPostQuery;
}
