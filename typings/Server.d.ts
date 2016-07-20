/**
 * node.js的自定义类型信息
 */
declare module "NodeData"{
    export interface HttpResult{
        data:any;
        code:number;
        message:string;
    }
    export interface IQueryParams{
        city?:string;
        area?:string;
        professionId?:number;
        itemId?:number;
        order?:string;
        currentPage?:number;
        pageRows?:number;
        location?:string;
    }
}
