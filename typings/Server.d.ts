/**
 * node.js的自定义类型信息
 */
declare module "NodeData"{
    export interface HttpResult{
        data:any;
        code:number;
        message:string;
    }
}
