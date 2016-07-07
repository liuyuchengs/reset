/**
 * $http查询参数headers接口
 */
declare interface IHeaders{
    accessToken:string;
    contentType:string;
}

declare module "IHeaders"{
    export = IHeaders;
}